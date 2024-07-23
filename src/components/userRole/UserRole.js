import { StyleSheet, View } from 'react-native'
import React, { memo, useState } from 'react'
import { useAuth } from '../../contexts'
import { SCREEN } from '../../enums/AppEnums'
import { Image, Label, Pressable } from '../reusables'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { commonStyles, hp, TEXT_STYLE, COLOR } from '../../enums/StyleGuide'

const UserRole = ({ item }) => {
    const { role, activeColor, image, title, instructions, route } = item
    const [active, setActive] = useState(false)
    const navigation = useNavigation()
    const { updateRole } = useAuth()

    const handleOnPress = () => {
        setActive(true)
        updateRole(role)
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    routes: [{ name: SCREEN.LOGIN }, { name: route }]
                })
            )
            // handleResetStack(navigation, SCREEN.LOGIN)
            setActive(false)
        }, 500)
    }

    return (
        <Pressable
            onPress={handleOnPress}
            style={[styles.container, active && { borderColor: activeColor }]}
        >
            <Image source={image} style={styles.imageStyle} />
            <View>
                <Label style={styles.labelStyle}>{title}</Label>
                <Label style={styles.textStyle}>{instructions}</Label>
            </View>
        </Pressable>
    )
}

export default memo(UserRole)

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1.5),
        borderRadius: hp(1.2),
        borderWidth: 1,
        borderColor: COLOR.lightGrey,
        paddingHorizontal: '5%',
        ...commonStyles.horizontalView_m1,
    },
    imageStyle: {
        height: hp(6),
        width: hp(6),
        marginRight: '3%',
    },
    labelStyle: {
        ...TEXT_STYLE.bigTextBold,
        color: COLOR.dark,
    },
    textStyle: {
        ...TEXT_STYLE.text,
        color: COLOR.black,
    },
})