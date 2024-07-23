import { StyleSheet } from 'react-native'
import React, { memo, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { hp, COLOR, TEXT_STYLE, commonStyles } from '../../../enums/StyleGuide'
import En from '../../../locales/En'

const DropDown = ({ data = [], selected, onSelect, placeholder = 'Select' }) => {
    const handleChange = (item) => onSelect(item)
    const [focused, setFocused] = useState(false)
    const Styles = styles(focused)

    return (
        <Dropdown
            style={Styles.dropdown}
            placeholderStyle={Styles.placeholderStyle}
            selectedTextStyle={Styles.selectedTextStyle}
            data={data}
            maxHeight={hp(20)}
            labelField={'label'}
            valueField={'value'}
            placeholder={placeholder}
            value={selected?.value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            iconColor={focused ? COLOR.primary : COLOR.grey}
        />
    )
}

export default memo(DropDown)

const styles = (focused) => StyleSheet.create({
    dropdown: {
        height: hp(7),
        width: '92%',
        paddingHorizontal: '5%',
        // ...commonStyles.justifyView,
        alignSelf: 'center',
        backgroundColor: COLOR.fadeWhite,
        borderWidth: 1,
        borderColor: COLOR.gray_2,
        borderRadius: hp(1),
        ...commonStyles.shadow_5,
        marginVertical: hp(1.4),
        // height: hp(6.5),
        // width: '93%',
        // alignSelf: 'center',
        // borderRadius: hp(5),
        // paddingHorizontal: '5%',
        // borderWidth: 1,
        // borderColor: focused ? COLOR.primary : COLOR.grey,
        // backgroundColor: COLOR.white,
        // marginVertical: hp(1),
    },
    placeholderStyle: {
        ...TEXT_STYLE.bigText,
        marginBottom: 3,
        color: COLOR.grey,
    },
    selectedTextStyle: {
        ...TEXT_STYLE.bigTextMedium,
        color: focused ? COLOR.grey : COLOR.black,
    },
    iconContainer: {
        width: '10%',
    },
})