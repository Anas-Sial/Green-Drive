import React, { memo } from 'react'

const AnyIcon = ({ type, name, color, size = 25, style, onPress }) => {
    const Tag = type
    return (
        <>
            {(type && name) &&
                <Tag name={name} size={size} color={color} style={style} onPress={() => { onPress && onPress() }} />
            }
        </>
    )
}

export default memo(AnyIcon)
