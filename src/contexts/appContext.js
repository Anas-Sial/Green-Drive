import React, { createContext, useState, useEffect, useContext } from 'react'
import En from '../locales/En'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { emptyFunction, showFlash } from '../utils/Helpers'
import { FIREBASE_COLLECTION, FIREBASE_ERROR, SCREEN, STORAGE } from '../enums/AppEnums'
import { saveData, saveDataInDocument, uploadImage, getDocumentData, getAllOfCollectionWhere, getCollectionData, Delete } from '../utils/firebaseServices'
import { useAuth } from './authContext'

export const AppContext = createContext({
    allStations: [],
    favorites: [],
    likeProfile: emptyFunction,
    disLikeProfile: emptyFunction,
})

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
    const [stations, setStations] = useState([])
    const [favorites, setFavorites] = useState([])
    const { userData } = useAuth()

    useEffect(() => {
        if (userData?.uid) {
            fetchStations()
            getFavoritesList()
        }
    }, [userData?.uid])

    const fetchStations = async () => {
        const data = await getCollectionData(FIREBASE_COLLECTION.STATIONS)
        if (data) {
            setStations(data)
        }
    }

    const getUserById = async (userId) => {
        const userData = await getDocumentData(FIREBASE_COLLECTION.USERS, userId)
        if (userData) {
            return userData
        }
    }

    const getStationById = async (userId) => {
        const userData = await getDocumentData(FIREBASE_COLLECTION.STATIONS, userId)
        if (userData) {
            return userData
        }
    }

    // console.log(getUserById(userData.uid))

    const getFavoritesList = async () => {
        let allData = []

        const userQuery = userData?.hostName ? 'profileId' : 'likedBy'

        await firestore()
            .collection(FIREBASE_COLLECTION.FAVORITE)
            .where(userQuery, '==', userData?.uid)
            .get()
            .then(async (querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        allData.push({ ...doc.data() })
                    } else {
                        console.log('No document found!')
                    }
                })
            })

        if (allData?.length >= 1) {

            let formattedRequests = []

            for (const item of allData) {
                let otherUserData = {}

                if (userData?.hostName) {
                    otherUserData = await getUserById(item?.likedBy)
                } else {
                    otherUserData = await getStationById(item?.profileId)
                }

                console.log(otherUserData)

                const formattedRequest = {
                    ...item,
                    profileImage: otherUserData?.profileImage,
                    name: userData.hostName ? `${otherUserData?.firstName} ${otherUserData?.lastName}` : otherUserData?.hostName,
                    address: otherUserData?.location?.address,
                }

                formattedRequests.push(formattedRequest)
            }

            setFavorites(formattedRequests)
        } else {
            setFavorites([])
        }

    }


    const likeProfile = async (otherUserId) => {
        let formattedData = {
            likedBy: userData?.uid,
            profileId: otherUserId,
            createdAt: firestore.FieldValue.serverTimestamp(),
        }

        const docRef = firestore().collection(FIREBASE_COLLECTION.FAVORITE).doc()
        formattedData.documentId = docRef?.id
        await docRef.set(formattedData, { merge: true })

        getFavoritesList()
    }

    const disLikeProfile = async (documentId) => {
        await Delete(FIREBASE_COLLECTION.FAVORITE, documentId)
        getFavoritesList()
    }


    return (
        <AppContext.Provider
            value={{
                allStations: stations,
                favorites,
                likeProfile,
                disLikeProfile,
            }}>
            {children}
        </AppContext.Provider>
    )
}
