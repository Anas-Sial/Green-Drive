import { ScrollView } from 'react-native'
import React, { memo } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { hp } from '../../../enums/StyleGuide'

const Scrollable = (props) => {
    const { children, hasInput, horizontal, containerStyle } = props

    if (hasInput) {
        return (
            <KeyboardAwareScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={containerStyle}
                horizontal={horizontal}
                bounces={false}>
                {children}
            </KeyboardAwareScrollView>
        )
    } else {
        return (
            <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: hp(1) }, containerStyle]}
                horizontal={horizontal}
                bounces={false}>
                {children}
            </ScrollView>
        )
    }
}

export default memo(Scrollable)