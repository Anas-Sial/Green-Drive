import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState, memo } from 'react'
import Label from '../label'
import Pressable from '../pressable'
import { KEYBOARD_TYPE } from '../../../enums/AppEnums'
import { CountryPicker } from 'react-native-country-codes-picker'
import { hp, COLOR, commonStyles, TEXT_STYLE } from '../../../enums/StyleGuide'

const NumberPicker = ({ code, setCode, number, setNumber }) => {
    const [show, setShow] = useState(false)

    const handleCountryPick = (item) => {
        setCode(item?.dial_code)
        setShow(false)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.inputContainer}>

                    <Pressable style={styles.pickerButton} onPress={() => setShow(true)}>
                        <Label style={styles.codeText}>{code}</Label>
                    </Pressable>

                    <TextInput
                        // maxLength={10}
                        value={number}
                        style={styles.inputStyle}
                        cursorColor={COLOR.primary}
                        placeholder={'Enter your phone number'}
                        onChangeText={(x) => setNumber(x)}
                        keyboardType={KEYBOARD_TYPE.NUMERIC}
                        placeholderTextColor={COLOR.lightGrey}
                    />

                </View>
            </View>
            <CountryPicker
                show={show}
                style={styles.pickerStyle}
                onBackdropPress={() => setShow(false)}
                pickerButtonOnPress={handleCountryPick}
            />
        </>
    )
}

export default memo(NumberPicker)

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(1),
    },
    inputContainer: {
        height: hp(7),
        width: '92%',
        paddingHorizontal: '3%',
        ...commonStyles.justifyView,
        alignSelf: 'center',
        backgroundColor: COLOR.fadeWhite,
        borderWidth: 1,
        borderColor: COLOR.gray_2,
        borderRadius: hp(1),
        ...commonStyles.shadow_5,
        marginVertical: hp(1.4),
    },
    pickerButton: {
        width: '12%',
        alignItems: 'center',
        paddingRight: '2%',
    },

    codeText: {
        ...TEXT_STYLE.fontLg,
        color: COLOR.black,
    },
    inputStyle: {
        ...TEXT_STYLE.font,
        fontSize: 16,
        color: COLOR.black,
        flex: 1,
        top: 0,
        borderLeftWidth: 1,
        borderLeftColor: COLOR.grey,
        paddingVertical: 0,
        paddingLeft: 12,
    },

    input: {
        flex: 1,
        // ...TEXT_STYLE.textMedium,
        marginBottom: 1,
        fontSize: 14,
        color: COLOR.black,
        justifyContent: 'center',
    },

    pickerStyle: {
        modal: {
            height: '60%',
            backgroundColor: COLOR.white,
        },
        textInput: {
            paddingHorizontal: 12,
            height: 48,
            color: COLOR.black,
            backgroundColor: COLOR.lightGrey,
        },
        dialCode: {
            ...TEXT_STYLE.fontLgs,
            color: COLOR.black,
        },
        countryName: {
            ...TEXT_STYLE.fontLgs,
            color: COLOR.grey,
        },
        countryButtonStyles: {
            // height: 50,
            backgroundColor: COLOR.white,
            borderRadius: 0,
            borderBottomWidth: 1,
            borderBottomColor: COLOR.lightGrey,
            marginBottom: 0,
        },
    },
})