import { Modal, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import React, { memo } from 'react'
import { hp, COLOR, commonStyles, TEXT_STYLE } from '../../enums/StyleGuide'
import { SvgElement, Pressable, Label } from '../reusables'
import { BackArrow } from '../../assets/svg'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../enums/AppEnums'
import En from '../../locales/En'
import { emptyFunction } from '../../utils/Helpers'

const size = hp(2.5)

const OptionItem = ({ icon, title, onPress = emptyFunction }) => {
    return (
        <Pressable style={styles.itemStyle} onPress={() => onPress(title)}>
            <View style={styles.iconStyle}>
                <SvgElement name={icon} height={size} width={size} color={COLOR.black} />
            </View>
            <Label style={styles.text}>{title}</Label>
        </Pressable>
    )
}

const OptionsModal = ({ visible, setVisible, station }) => {
    const navigation = useNavigation()

    const onClose = () => {
        setVisible(false)
    }

    const handleNavigation = (route, params) => {
        onClose()
        navigation.navigate(route, { ...params })
    }

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => onClose()}
            animationType={'slide'}
        >
            <TouchableWithoutFeedback onPress={() => onClose()}>
                <View style={styles.flex_1} />
            </TouchableWithoutFeedback>
            <View style={styles.flexWrapper}>
                <View style={[styles.container]}>
                    <View style={styles.line} />


                    <OptionItem
                        title={En.share}
                        icon={BackArrow}
                    />
                    <OptionItem
                        title={En.chat}
                        icon={BackArrow}
                        onPress={() => handleNavigation(SCREEN.CHAT)}
                    />
                    <OptionItem
                        title={En.book}
                        icon={BackArrow}
                        onPress={() => handleNavigation(SCREEN.ADD_BOOKING, { station })}
                    />

                </View>
            </View>
        </Modal>
    )
}

export default OptionsModal

const styles = StyleSheet.create({
    flexWrapper: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'flex-end',
    },
    flex_1: {
        flex: 1,
    },
    container: {
        maxHeight: hp(72),
        paddingVertical: hp(1.5),
        backgroundColor: COLOR.white,
        borderTopRightRadius: hp(1.5),
        borderTopLeftRadius: hp(1.5),
        paddingHorizontal: '5%',
        ...commonStyles.shadow_20,
    },
    line: {
        height: hp(0.9),
        width: '22%',
        borderRadius: hp(2),
        backgroundColor: COLOR.lightGrey,
        alignSelf: 'center',
        marginBottom: hp(1.2),
    },
    backdropStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: COLOR.backdrop,
        position: 'absolute',
    },

    itemStyle: {
        ...commonStyles.horizontalView,
        paddingVertical: hp(0.5),
        marginVertical: hp(0.5),
    },
    iconStyle: {
        height: hp(4.2),
        width: hp(4.2),
        backgroundColor: COLOR.lightGrey2,
        borderRadius: hp(5),
        ...commonStyles.center,
        marginRight: '5%',
    },
    title: {
        ...TEXT_STYLE.smallTitleBold,
        color: COLOR.black,
        textAlign: 'center',
        marginBottom: hp(1),
    },
    text: {
        ...TEXT_STYLE.bigTextSemiBold,
        color: COLOR.black,
        marginBottom: 2.5,
    },
})