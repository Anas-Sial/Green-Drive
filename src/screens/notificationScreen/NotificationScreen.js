import { StyleSheet, View } from 'react-native'
import React from 'react'
import En from '../../locales/En'
import { localNotifications } from '../../data/local'
import { Header, Image, Label, Scrollable } from '../../components'
import { COLOR, hp, TEXT_STYLE, commonStyles, wp } from '../../enums/StyleGuide'

const NotificationScreen = () => {
    return (
        <View style={styles.mainScreen}>
            <Header title={En.notifications} backButton />
            <Scrollable>
                {localNotifications.map((item, index) => (
                    <View style={styles.itemContainer} key={index}>
                        <Image source={item?.image} style={styles.iconStyle} />
                        <Label style={styles.text}>{item?.text}</Label>
                    </View>
                ))}
            </Scrollable>
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: COLOR.white,
    },

    itemContainer: {
        marginHorizontal: '5%',
        backgroundColor: COLOR.lightGrey_2,
        paddingHorizontal: '5%',
        paddingVertical: hp(2),
        borderRadius: hp(1.5),
        ...commonStyles.justifyView_m1,
        ...commonStyles.shadow_5,
        borderWidth: 1,
        borderColor: COLOR.gray_3,
    },
    iconStyle: {
        height: hp(7),
        width: hp(7),
        borderRadius: hp(5),
        marginRight: wp(3),
    },
    text: {
        flex: 1,
        ...TEXT_STYLE.smallTextMedium,
        color: COLOR.darkGrey,
    },

})