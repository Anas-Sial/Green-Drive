import { StyleSheet } from 'react-native'
import React, { memo, useRef, useEffect } from 'react'
import OTPTextInput from 'react-native-otp-textinput'
import { COLOR, hp, wp, commonStyles } from '../../enums/StyleGuide'

const OtpInput = (props) => {
    const { onChange, style, resetValue, setResetValue } = props
    const otpInputRef = useRef(null)

    useEffect(() => {
        if (resetValue) {
            otpInputRef.current.clear()
            setTimeout(() => {
                setResetValue(false)
            }, 400)
        }
    }, [resetValue])

    return (
        <OTPTextInput
            ref={otpInputRef}
            inputCount={6}
            tintColor={COLOR.black}
            offTintColor={COLOR.gray_2}
            autoFocus
            containerStyle={[styles.container, style]}
            textInputStyle={styles.inputStyle}
            handleTextChange={x => onChange(x)}
        />
    )
}

export default memo(OtpInput)

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(3),
        // marginHorizontal: wp(0),
        width: wp(92),
        alignSelf: 'center'
    },
    inputStyle: {
        height: hp(5.5),
        width: wp(12),
        color: COLOR.black,
        borderWidth: 1,
        borderRadius: hp(1),
        borderBottomWidth: 1,
        borderColor: COLOR.gray_2,
        backgroundColor: COLOR.white,
        ...commonStyles.shadow_3,
        fontSize: 18
    },
})