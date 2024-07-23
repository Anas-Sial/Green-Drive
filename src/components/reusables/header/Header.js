import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR, commonStyles, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { BackArrow } from '../../../assets/svg'
import Pressable from '../pressable'
import Label from '../label'
import SvgElement from '../svgElement'
import { useNavigation } from '@react-navigation/native'

const Header = (props) => {
    const { onLeftPress, title, addLeft, style, addRight, backButton } = props
    const navigation = useNavigation()
    return (
        <View style={[styles.container, style]}>
            <Pressable onPress={onLeftPress}>
                {addLeft ?
                    <View style={{ width: wp(10) }} />
                    :
                    backButton &&
                    <SvgElement
                        name={BackArrow}
                        color={COLOR.black}
                        onPress={() => navigation.goBack()}
                    />
                }
            </Pressable>
            <Label style={styles.titleStyle}>{title}</Label>
            {addRight ? addRight :
                <View style={{ width: wp(6) }} />
            }
        </View>
    )
}

export default memo(Header)

const styles = StyleSheet.create({
    container: {
        ...commonStyles.justifyView_m2,
        width: wp(92),
        alignSelf: 'center',
    },
    titleStyle: {
        ...TEXT_STYLE.smallTitleMedium,
        color: COLOR.black
    }
})