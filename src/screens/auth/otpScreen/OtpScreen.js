import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, commonStyles, hp, TEXT_STYLE } from '../../../enums/StyleGuide'
import { Button, Header, Image, Label, OtpInput, Scrollable } from '../../../components'
import { IMAGES } from '../../../assets/images'
import En from '../../../locales/En'
import { useAuth } from '../../../contexts'

const OtpScreen = ({ route }) => {
    const phoneNumber = route?.params?.phoneNumber
    const [otp, setOtp] = useState('')
    const { confirmOTPCode, loading } = useAuth()
    const handleOtpChange = (otp) => setOtp(otp)

    const handleOtp = () => {
        if (otp?.length == 6) {
            confirmOTPCode(otp)
        } else {
            showFlash('Please enter a 6 digit Otp code')
        }
    }

    return (
        <View style={styles.container}>
            <Scrollable hasInput>

                <Header backButton />

                <View style={styles.infoContainer}>
                    <Image source={IMAGES.verify} style={styles.verifyImg} />
                    <Label style={styles.verification}>{En.verificationCode}</Label>
                    <Label style={styles.message}>{En.otpSentMessage}</Label>
                    <Label style={styles.email}>{phoneNumber || 'email'}</Label>
                </View>

                <OtpInput
                    style={styles.otpStyle}
                    onChange={handleOtpChange}
                />

                <Button
                    onPress={() => handleOtp()}
                    title={En.verify}
                    isLoading={loading}
                    style={{ marginTop: hp(25) }} />

            </Scrollable>
        </View>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    container: {
        ...commonStyles.mainContainer,
    },
    infoContainer: {
        alignItems: 'center',
        marginTop: hp(4)
    },
    verifyImg: {
        width: 145,
        height: 145,
    },
    verification: {
        ...TEXT_STYLE.smallTitleBold,
        color: COLOR.dark,
        marginTop: hp(5)
    },
    message: {
        ...TEXT_STYLE.textMedium,
        color: COLOR.gray_2,
        marginTop: hp(.5)
    },
    email: {
        ...TEXT_STYLE.textMedium,
        color: COLOR.black
    },
    otpStyle: {

    }
})