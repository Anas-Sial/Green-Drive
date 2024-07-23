import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { hp } from '../../../enums/StyleGuide'
import FastImage from 'react-native-fast-image'

const Image = (props) => {
    const { source, style, contain } = props
    return (
        <FastImage
            source={source}
            style={[styles.image, style]}
            resizeMode={contain ?
                FastImage.resizeMode.contain :
                FastImage.resizeMode.cover
            }
        />
    )
}

export default memo(Image)

const styles = StyleSheet.create({
    image: {
        height: hp(5),
        width: hp(5),
    },
})