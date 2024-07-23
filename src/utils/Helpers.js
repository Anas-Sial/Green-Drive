import { Platform } from 'react-native'
import { COLOR, TEXT_STYLE } from '../enums/StyleGuide'
import ImagePicker from 'react-native-image-crop-picker'
import { CommonActions } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'

export const showFlash = (message, type = 'success', icon = 'none', floating = false) => {
    showMessage({
        message,
        type,
        floating,
        icon,
        textStyle: { ...TEXT_STYLE.text, color: COLOR.white, textAlign: 'center' },
        titleStyle: { ...TEXT_STYLE.text, color: COLOR.white, textAlign: 'center' },
        style: { backgroundColor: COLOR.primary },
    })
}

export const isIOS = () => {
    return Platform.OS == 'ios'
}

export const emptyFunction = () => { }

export const isEmailValid = (text) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return reg?.test(text)
}

export const isStrongPassword = (text) => {
    // password should be 6 digits and have one capital, one special char and a number
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{6,}$/
    return strongPasswordRegex?.test(text)
}

export const handleResetStack = (navigation, screenName) => {
    navigation.dispatch(
        CommonActions.reset({
            routes: [{ name: screenName }]
        })
    )
}

export const openCamera = (options = {}) => {
    return new Promise((resolve, reject) => {
        ImagePicker.openCamera({
            height: 400,
            width: 400,
            cropping: true,
            mediaType: 'photo',
            ...options,
        })
            .then(async (image) => resolve(image))
            .catch((err) => reject(err))
    })
}

export const openGallery = (options = {}) => {
    return new Promise((resolve, reject) => {
        ImagePicker.openPicker({
            height: 400,
            width: 400,
            cropping: true,
            mediaType: 'photo',
            ...options,
        })
            .then((image) => resolve(image))
            .catch((err) => reject(err))
    })
}

export const handleLocationRequest = (callBack) => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
            if (result === RESULTS.GRANTED) {
                callBack()
            } else {
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                    .then((result) => {
                        if (result === RESULTS.GRANTED) {
                            callBack()
                        } else {
                            console.log('Location permission denied')
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
        .catch((error) => {
            console.log('Error checking location permission:', error)
        })
}