import { StyleSheet, View, Alert } from 'react-native'
import React, { useState } from 'react'
import En from '../../../locales/En'
import { useAuth } from '../../../contexts'
import { CameraSVG } from '../../../assets/svg'
import { IMAGES } from '../../../assets/images'
import { KEYBOARD_TYPE, SCREEN } from '../../../enums/AppEnums'
import { COLOR, commonStyles, hp, wp, TEXT_STYLE } from '../../../enums/StyleGuide'
import { Button, Header, Image, Input, Label, Pressable, Scrollable } from '../../../components'
import { isEmailValid, isStrongPassword, openCamera, openGallery, showFlash } from '../../../utils/Helpers'

const SignupScreen = ({ navigation }) => {
    const [registerForm, setRegisterForm] = useState({})
    const { registerUser, loading } = useAuth()

    const handleFormChange = (key, value) => {
        setRegisterForm({ ...registerForm, [key]: value })
    }

    const handleImagePick = () => {
        Alert.alert(En.selectImage, '', [
            { text: En.camera, onPress: () => selectImage(true) },
            { text: En.gallery, onPress: () => selectImage() },
            { text: En.cancel, onPress: () => { } },
        ])
    }

    const selectImage = async (isCamera) => {
        let image
        if (isCamera) {
            image = await openCamera()
        } else {
            image = await openGallery()
        }
        handleFormChange('profileImage', image?.path)
    }

    const handleRegister = () => {
        const { firstName, lastName, email, password, confirmPassword, profileImage } = registerForm
        if (firstName && lastName && isEmailValid(email) && isStrongPassword(password) && confirmPassword == password && profileImage) {
            registerUser(registerForm)
        } else {
            if (!isEmailValid(email)) {
                showFlash('Enter a valid email')
            } else if (!isStrongPassword(password)) {
                showFlash('Enter a strong password')
            } else if (confirmPassword !== password) {
                showFlash('Password does not match')
            } else {
                showFlash(En.fillDataError)
            }
        }
    }

    return (
        <View style={commonStyles.mainContainer}>
            <Scrollable hasInput>

                <Header title={En.creatingNewAccount} backButton />

                <View style={styles.profileContainer}>
                    <Image
                        source={registerForm?.profileImage ? { uri: registerForm?.profileImage } : IMAGES.userImage}
                        style={styles.userImage}
                    />
                    <Pressable style={styles.cameraIcon} onPress={() => handleImagePick()}>
                        <CameraSVG />
                    </Pressable>
                </View>

                <View style={styles.nameFields}>
                    <Input
                        placeholder={En.firstName}
                        style={styles.nameInput}
                        value={registerForm?.firstName}
                        onChange={(x) => handleFormChange('firstName', x)}
                    />

                    <Input
                        placeholder={En.lastName}
                        style={styles.nameInput}
                        value={registerForm?.lastName}
                        onChange={(x) => handleFormChange('lastName', x)}
                    />
                </View>

                <Input
                    placeholder={En.email}
                    keyboard={KEYBOARD_TYPE.EMAIL}
                    value={registerForm?.email}
                    onChange={(x) => handleFormChange('email', x)}
                />
                {/*
                <Input
                    placeholder={En.phone}
                    value={registerForm?.phone}
                    onChange={(x) => handleFormChange('phone', x)}
                /> 
                */}
                <Input placeholder={En.password}
                    value={registerForm?.password}
                    onChange={(x) => handleFormChange('password', x)}
                />
                <Input placeholder={En.confirmPassword}
                    value={registerForm?.confirmPassword}
                    onChange={(x) => handleFormChange('confirmPassword', x)}
                />

                <Button
                    title={En.signUp}
                    isLoading={loading}
                    onPress={() => handleRegister()}
                    style={{ marginTop: hp(2.5) }}
                />

                <View style={styles.bottomContainer}>
                    <Label style={styles.accountLabel}>{En.alreadyHaveAnAccount}</Label>
                    <Pressable onPress={() => navigation.navigate(SCREEN.LOGIN)}>
                        <Label style={styles.registerLabel}>{' '}{En.login}</Label>
                    </Pressable>
                </View>

            </Scrollable>
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    profileContainer: {
        alignSelf: 'center',
        marginTop: hp(.7)
    },
    userImage: {
        height: hp(14),
        width: hp(14),
        borderRadius: hp(14) / 2
    },
    cameraIcon: {
        position: 'absolute',
        bottom: '4%',
        right: '2%'
    },
    nameFields: {
        ...commonStyles.justifyView,
        width: wp(92),
        alignSelf: 'center',
        marginTop: hp(2)
    },
    nameInput: {
        width: wp(42),
    },
    bottomContainer: {
        ...commonStyles.horizontalView,
        alignSelf: 'center',
        marginTop: hp(9.5),
        marginBottom: hp(2)
    },
    accountLabel: {
        ...TEXT_STYLE.bigText_2,
        color: COLOR.grey,
    },
    registerLabel: {
        ...TEXT_STYLE.bigTextBold_2,
        color: COLOR.black
    }
})