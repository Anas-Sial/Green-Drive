import { StyleSheet, TextInput } from 'react-native'
import React, { memo, useState } from 'react'
import { Pressable } from '../reusables'
import { isIOS } from '../../utils/Helpers'
import DateTimePicker from '@react-native-community/datetimepicker'
import { hp, commonStyles, COLOR, TEXT_STYLE } from '../../enums/StyleGuide'

const DatePicker = ({ value, onChange }) => {
    const [show, setShow] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || value
        if (!isIOS())
            setShow(false)
        onChange(currentDate)
    }

    return (
        <>
            <Pressable style={styles.container} onPress={() => setShow(true)}>
                <TextInput
                    editable={false}
                    placeholder={'DD/MM/YYYY'}
                    style={styles.inputStyle}
                    placeholderTextColor={COLOR.darkGrey}
                    value={value ? value?.toLocaleDateString() : ''}
                />
            </Pressable>

            {show &&
                <DateTimePicker
                    value={value}
                    mode='date'
                    display={isIOS() ? 'spinner' : 'calender'}
                    onChange={onDateChange}
                />
            }
        </>
    )
}

export default memo(DatePicker)

const styles = StyleSheet.create({
    container: {
        height: hp(7),
        width: '92%',
        alignSelf: 'center',
        marginVertical: hp(1.4),
    },
    date: {
        width: '22%',
        borderRadius: hp(1.5),
        paddingHorizontal: '5%',
        ...commonStyles.borderStyle,
        height: hp(7),
        backgroundColor: COLOR.white,
        marginEnd: hp(2),
        ...commonStyles.horizontalView,
    },
    year: {
        width: '46%',
        borderRadius: hp(1),
        paddingHorizontal: '5%',
        ...commonStyles.borderStyle,
        height: hp(7),
        backgroundColor: COLOR.white,
        marginEnd: hp(2),
        ...commonStyles.horizontalView,
    },
    doneButton: {
        height: hp(4),
        width: '100%',
        ...commonStyles.center,
    },
    buttonText: {
        ...TEXT_STYLE.textBold,
        fontSize: 16,
        color: COLOR.green_2,
    },

    inputStyle: {
        height: '100%',
        width: '100%',
        paddingHorizontal: '5%',
        ...commonStyles.justifyView,
        color: COLOR.black,
        backgroundColor: COLOR.fadeWhite,
        borderWidth: 1,
        borderColor: COLOR.gray_2,
        borderRadius: hp(1),
        ...commonStyles.shadow_5,

    },
})