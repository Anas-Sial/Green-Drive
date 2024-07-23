import React, { memo } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { emptyFunction } from '../../../utils/Helpers'
import { COLOR, hp, commonStyles, TEXT_STYLE } from '../../../enums/StyleGuide'

const Input = (props) => {
    const { placeholder, keyboard, onChange, onSubmitPress = emptyFunction, value, addLeft, style, secureText, onFocus, onBlur, textStyle } = props
    return (

        <View style={[styles.InputStyle, style]}>
            {addLeft}
            <TextInput
                style={[styles.Input, textStyle]}
                placeholder={placeholder}
                placeholderTextColor={COLOR.gray_2}
                keyboardType={keyboard}
                onChangeText={x => onChange && onChange(x)}
                value={value}
                secureTextEntry={secureText}
                onFocus={onFocus}
                autoCapitalize='none'
                onSubmitEditing={onSubmitPress}
                onBlur={onBlur} />
        </View>
    )
}

export default memo(Input)

const styles = StyleSheet.create({
    InputStyle: {
        height: hp(7),
        width: '92%',
        paddingHorizontal: '5%',
        ...commonStyles.justifyView,
        alignSelf: 'center',
        backgroundColor: COLOR.fadeWhite,
        borderWidth: 1,
        borderColor: COLOR.gray_2,
        borderRadius: hp(1),
        ...commonStyles.shadow_5,
        marginVertical: hp(1.4),
    },
    Input: {
        flex: 1,
        ...TEXT_STYLE.bigText_2,
        color: COLOR.black,
    },
})
