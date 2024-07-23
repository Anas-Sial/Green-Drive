import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { hp, commonStyles, COLOR, TEXT_STYLE } from '../../enums/StyleGuide'
import { Image, Label, Pressable } from '../reusables'
import { EditPencil } from '../../assets/svg'
import { IMAGES } from '../../assets/images'

const size = hp(1.8)

const SettingProfileView = () => {
    return (
        <View style={styles.container}>

            <Image source={IMAGES.dummyUser} style={styles.image} />

            <Pressable style={styles.cameraIcon}>
                <EditPencil height={size} width={size} />
            </Pressable>

            <Label style={styles.title}>{'Test User'}</Label>

        </View>
    )
}

export default memo(SettingProfileView)

const styles = StyleSheet.create({
    container: {
        height: hp(18),
        width: hp(18),
        borderRadius: hp(18),
        alignSelf: 'center',
        marginVertical: hp(3),
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: hp(18),
    },
    cameraIcon: {
        height: hp(3),
        width: hp(3),
        borderRadius: hp(4),
        backgroundColor: COLOR.white,
        position: 'absolute',
        bottom: '4%',
        right: '4%',
        ...commonStyles.shadow_10,
        ...commonStyles.center,
    },
    title: {
        ...TEXT_STYLE.bigTextBold,
        color: COLOR.primary,
    },
})