import React, { memo } from 'react'
import { COLOR } from '../../../enums/StyleGuide'

const SvgElement = (props) => {
    const { name, color = COLOR.white } = props
    const Tag = name
    return (
        <Tag color={color} {...props} />
    )
}

export default memo(SvgElement)
