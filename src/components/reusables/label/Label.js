import { StyleSheet, Text } from 'react-native'
import React, { memo } from 'react'
import { COLOR, TEXT_STYLE } from '../../../enums/StyleGuide'

const Label = (props) => {
    const { children, style, color } = props
    return (
        <Text
            allowFontScaling={false}
            style={[styles.TextStyle, style, { color }]}
            {...props}
        >
            {children}
        </Text>
    )
}

export default memo(Label)

const styles = StyleSheet.create({
    TextStyle: {
        ...TEXT_STYLE.text,
        color: COLOR.black,
    }
})