import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR, commonStyles, hp, TEXT_STYLE } from '../../../enums/StyleGuide'
import { Label, Image, UserRole } from '../../../components'
import En from '../../../locales/En'
import { IMAGES } from '../../../assets/images'
import { userRolesData } from '../../../data/local'

const RoleSelection = () => {
    return (
        <View style={commonStyles.mainContainer}>
            <Image source={IMAGES.roleBg} style={styles.bgImage} />
            <Image source={IMAGES.appLogo} style={styles.appLogo} contain />

            <View style={styles.bottomContainer}>
                <Label style={styles.heading}>{En.yourRole}</Label>
                <Label style={styles.greyText}>{En.canSwitchLater}</Label>

                {userRolesData.map((item, index) => (
                    <UserRole item={item} key={index} />
                ))}

            </View>
        </View>
    )
}

export default RoleSelection

const styles = StyleSheet.create({
    bgImage: {
        height: '100%',
        width: '100%',
    },
    appLogo: {
        width: '50%',
        height: hp(17),
        position: 'absolute',
        top: hp(14),
        alignSelf: 'center',
    },
    bottomContainer: {
        bottom: 0,
        width: '100%',
        position: 'absolute',
        paddingVertical: hp(3),
        paddingHorizontal: '5%',
        borderTopLeftRadius: hp(2),
        borderTopRightRadius: hp(2),
        backgroundColor: COLOR.white,
    },
    heading: {
        ...TEXT_STYLE.titleBold,
        color: COLOR.dark,
        textAlign: 'center',
    },
    greyText: {
        ...TEXT_STYLE.bigText,
        color: COLOR.grey,
        textAlign: 'center',
    },
})
