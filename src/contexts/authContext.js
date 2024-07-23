import React, { createContext, useState, useEffect, useContext } from 'react'
import En from '../locales/En'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { emptyFunction, showFlash } from '../utils/Helpers'
import { FIREBASE_COLLECTION, FIREBASE_ERROR, SCREEN, STORAGE } from '../enums/AppEnums'
import { saveData, saveDataInDocument, uploadImage, getDocumentData, getAllOfCollectionWhere } from '../utils/firebaseServices'

export const AuthContext = createContext({
    showSplash: true,
    user: {},
    userData: {},
    loading: false,
    logoutUser: emptyFunction,
    loginUser: emptyFunction,
    registerUser: emptyFunction,
    createStation: emptyFunction,
    sendOtpToNumber: emptyFunction,
    confirmOTPCode: emptyFunction,
    resetPassword: emptyFunction,
    updateRole: emptyFunction
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation()
    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})
    const [confirm, setConfirm] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showSplash, setShowSplash] = useState(true)
    const [role, setRole] = useState(null)

    useEffect(() => {
        const onAuthStateChanged = async (userInfo) => {
            setShowSplash(true)
            if (userInfo) {
                setUser(userInfo)
                await getUserData(userInfo?.uid)
            } else {
                setUser({})
                setUserData({})
            }
            setTimeout(() => {
                setShowSplash(false)
            }, 1500)
        }
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    async function getUserData(id) {
        const foundUser = await getDocumentData(FIREBASE_COLLECTION.USERS, id)
        const foundStation = await getDocumentData(FIREBASE_COLLECTION.STATIONS, id)
        if (foundUser?.uid) {
            setUserData(foundUser)
        }
        if (foundStation?.uid) {
            setUserData(foundStation)
        }
    }

    async function updateRole(newRole) {
        setRole(newRole);
    }

    async function loginUser(email, password) {
        setLoading(true)
        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Sign in successfully')
            })
            .catch(error => {
                if (error?.code === FIREBASE_ERROR.INVALID_EMAIL) {
                    showFlash(En.invalidEmailMessage)
                } else if (error?.code === FIREBASE_ERROR.NO_USER_FOUND) {
                    showFlash(En.noUserFound)
                } else if (error?.code === FIREBASE_ERROR.WRONG_PASSWORD) {
                    showFlash(En.incorrectPassword)
                } else if (error?.code === FIREBASE_ERROR.INVALID_LOGIN) {
                    showFlash(En.emailPasswordIncorrect)
                } else {
                    showFlash(error?.message)
                }
            }).finally(() => {
                setLoading(false)
            })
    }

    async function registerUser(data) {
        setLoading(true)
        const { email, password, profileImage, firstName, lastName } = data
        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const userId = userCredentials?.user?.uid

                const uploadedImage = await uploadImage(profileImage, `${STORAGE.IMAGES}/${userId}`)

                if (uploadedImage !== 'false') {
                    const dataToUpload = {
                        uid: userId,
                        firstName,
                        lastName,
                        email,
                        isPhoneVerified: false,
                        profileImage: uploadedImage,
                        role: 'user',
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    }

                    await saveDataInDocument(FIREBASE_COLLECTION.USERS, userId, dataToUpload)

                }
            }).catch((e) => {
                if (error?.code === FIREBASE_ERROR.EMAIL_ALREADY_EXISTS) {
                    showFlash(En.emailAddressAlreadyExits)
                } else if (error?.code === FIREBASE_ERROR.INVALID_EMAIL) {
                    showFlash(En.invalidEmailMessage)
                } else if (error?.code === FIREBASE_ERROR.WEAK_PASSWORD) {
                    showFlash(En.weakPassword)
                }
                console.log(e)
            }).finally(() => {
                setLoading(false)
            })
    }

    async function createStation(data) {
        setLoading(true)
        const { hostName, stationName, email, city, password, state, zipCode, perUnitPrice, link, profileImage, location, stationImages } = data

        await auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const userId = userCredentials?.user?.uid

                // Upload profile image
                const uploadedImage = await uploadImage(profileImage, `${STORAGE.IMAGES}/${userId}`);

                // Upload station images
                const uploadedStationImages = await Promise.all(stationImages.map(async (image, index) => {
                    const uploaded = await uploadImage(image, `${STORAGE.STATION_IMAGES}/${userId}/image_${index}`);
                    return uploaded;
                }));

                const formattedAddress = { address: location.address, latitude: location?.coordinates?.lat, longitude: location?.coordinates?.lng }

                if (uploadedImage !== 'false') {
                    let dataToUpload = {
                        uid: userId,
                        hostName,
                        stationName,
                        email,
                        city,
                        state,
                        zipCode,
                        perUnitPrice,
                        isPhoneVerified: false,
                        profileImage: uploadedImage,
                        stationImages: uploadedStationImages,
                        location: formattedAddress,
                        role: 'Owner',
                        createdAt: firestore.FieldValue.serverTimestamp(),
                    }

                    if (link) {
                        dataToUpload.link = link
                    }

                    await saveDataInDocument(FIREBASE_COLLECTION.STATIONS, userId, dataToUpload)

                }
            }).catch((e) => {
                if (error?.code === FIREBASE_ERROR.EMAIL_ALREADY_EXISTS) {
                    showFlash(En.emailAddressAlreadyExits)
                } else if (error?.code === FIREBASE_ERROR.INVALID_EMAIL) {
                    showFlash(En.invalidEmailMessage)
                } else if (error?.code === FIREBASE_ERROR.WEAK_PASSWORD) {
                    showFlash(En.weakPassword)
                }
                console.log(e)
            }).finally(() => {
                setLoading(false)
            })
    }

    async function sendOtpToNumber(phone) {
        setLoading(true)
        let phoneExistInUsers = await getAllOfCollectionWhere(FIREBASE_COLLECTION.USERS, 'phone', phone)
        let phoneExistInStations = await getAllOfCollectionWhere(FIREBASE_COLLECTION.STATIONS, 'phone', phone)

        if (phoneExistInUsers?.length !== 0 || phoneExistInStations?.length !== 0) {
            setLoading(false)
            showFlash(En.phoneExists)
            return
        }

        await auth()
            .verifyPhoneNumber(phone, true)
            .then(async (confirmation) => {
                navigation.navigate(SCREEN.OTP, { phoneNumber: phone })
                setConfirm(confirmation)
                await updateUser({ phone })
            })
            .catch(() => {
                showFlash(En.errorSendingOtp)
            })
            .finally(() => setLoading(false))
    }

    async function resetPassword(email) {
        await auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                showFlash(En.passwordResetEmailSent)
                navigation.goBack()
            })
            .catch(error => {
                console.log(error)
                if (error?.code === FIREBASE_ERROR.NO_USER_FOUND) {
                    showFlash(En.noUserFound)
                } else {
                    console.log(error)
                }
            })
    }

    async function confirmOTPCode(code) {
        setLoading(true)
        try {
            const credential = auth.PhoneAuthProvider.credential(confirm.verificationId || confirm?.token, code)
            await auth()?.currentUser?.linkWithCredential(credential)
            navigation.navigate(SCREEN.SUCCESS)
            setTimeout(() => {
                updateUser({ isPhoneVerified: true })
            }, 3000)
        } catch (error) {
            showFlash('Invalid Code')
            console.log('Invalid code')
        } finally {
            setLoading(false)
        }
    }

    async function updateUser(object, notMerge = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let collection
                if (userData.role == 'Owner') {
                    collection = FIREBASE_COLLECTION.STATIONS
                } else {
                    collection = FIREBASE_COLLECTION.USERS
                }

                await saveData(FIREBASE_COLLECTION.USERS, auth()?.currentUser?.uid, object, !notMerge)
                if (notMerge) {
                    setUserData(object)
                } else {
                    setUserData({ ...userData, ...object })
                }
                resolve(true)
            } catch (error) {
                console.log('Something went wrong while updating user', error)
                reject(false)
            }
        })
    }

    async function logoutUser() {
        await auth().signOut()
    }

    return (
        <AuthContext.Provider
            value={{
                showSplash,
                user,
                loading,
                userData,
                updateRole,
                logoutUser,
                loginUser,
                registerUser,
                createStation,
                sendOtpToNumber,
                confirmOTPCode,
                resetPassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}
