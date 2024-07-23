import { StyleSheet, View } from 'react-native'
import React from 'react'
import En from '../../../locales/En'
import { IMAGES } from '../../../assets/images'
import { Image, Label } from '../../../components'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'

const SuccessScreen = ({ route }) => {
    const reset = route?.params?.reset
    return (
        <View style={styles.container}>

            <View style={styles.infoContainer}>
                <Image source={IMAGES.success} style={styles.verifyImg} />
                <Label style={styles.verification}>{En.success}</Label>
                <Label style={styles.message}>{reset ? En.youHaveResetPassword : En.youAreVerifiedUser}</Label>
            </View>

            {/* <View style={styles.subContainer}>
                <Button
                    onPress={() => navigation.navigate(SCREEN.LOGIN)}
                    title={En.continueToSignin}
                    style={{ marginTop: hp(25) }} />
            </View> */}
        </View>
    )
}

export default SuccessScreen

const styles = StyleSheet.create({
    container: {
        ...commonStyles.mainContainer,
        ...commonStyles.center,
    },
    infoContainer: {
        alignItems: 'center',
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
        ...TEXT_STYLE.bigTextMedium,
        color: COLOR.black,
        width: wp(47),
        textAlign: 'center'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: hp(6),
    }
})