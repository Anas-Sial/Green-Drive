import { TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { ACTIVE_OPACITY } from '../../../enums/StyleGuide'
import { emptyFunction } from '../../../utils/Helpers'

const Pressable = ({ children, onPress = emptyFunction, style, opacity = ACTIVE_OPACITY }) => {
    return (
        <TouchableOpacity
            activeOpacity={opacity}
            style={style}
            onPress={() => onPress()}
        >
            {children}
        </TouchableOpacity>
    )
}

export default memo(Pressable)
