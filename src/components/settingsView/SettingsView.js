import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR, hp, commonStyles, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { RightArrow } from '../../assets/svg'
import { Label, Pressable } from '../reusables'
import { useNavigation } from '@react-navigation/native'

const size = hp(2.7)

const SettingsView = ({ item }) => {
    const { title, icon, route } = item
    const Tag = icon
    const navigation = useNavigation()

    const handleOnPress = () => {
        route && navigation.navigate(route)
    }

    return (
        <Pressable style={styles.container} onPress={handleOnPress}>

            <View style={commonStyles.horizontalView}>
                <View style={styles.iconStyle}>
                    <Tag height={size} width={size} />
                </View>
                <Label style={styles.title}>{title}</Label>
            </View>

            <RightArrow />
        </Pressable>
    )
}

export default memo(SettingsView)

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.lightGrey_2,
        paddingHorizontal: '5%',
        paddingVertical: hp(2),
        borderRadius: hp(1.5),
        ...commonStyles.justifyView_m1,
    },
    iconStyle: {
        height: hp(5.5),
        width: hp(5.5),
        borderRadius: hp(1),
        backgroundColor: COLOR.white,
        ...commonStyles.center,
        marginRight: wp(3),
    },
    title: {
        ...TEXT_STYLE.bigTextSemiBold,
        color: COLOR.darkGrey,
    },
})