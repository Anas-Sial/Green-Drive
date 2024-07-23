import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { COLOR, commonStyles, hp } from '../../enums/StyleGuide'
import { Image, SvgElement } from '../reusables'
import { IMAGES } from '../../assets/images'
import { BackArrow, ThreeDots } from '../../assets/svg'
import { useNavigation } from '@react-navigation/native'
import { emptyFunction } from '../../utils/Helpers'

const StationProfileHeader = ({ coverImage, image, onOptionPress = emptyFunction }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>

            <View style={styles.coverView}>

                <View style={styles.headerStyle}>
                    <SvgElement name={BackArrow} color={COLOR.white} onPress={() => navigation.goBack()} />
                    <SvgElement name={ThreeDots} onPress={onOptionPress} />
                </View>

                <Image source={coverImage ? { uri: coverImage } : IMAGES.cars} style={styles.coverStyle} />

            </View>

            <Image source={image ? { uri: image } : IMAGES.dummyUser} style={styles.profileImage} />


        </View>
    )
}

export default memo(StationProfileHeader)

const styles = StyleSheet.create({
    container: {
        paddingBottom: hp(8.5),
    },
    coverView: {
        height: hp(25),
        backgroundColor: COLOR.black,
    },
    coverStyle: {
        height: '100%',
        width: '100%',
        opacity: 0.5,
    },
    headerStyle: {
        ...commonStyles.justifyView,
        position: 'absolute',
        width: '100%',
        top: 0,
        paddingHorizontal: '5%',
        paddingTop: hp(2.5),
        zIndex: 1,
    },
    profileImage: {
        height: hp(15),
        width: hp(15),
        borderRadius: hp(18),
        borderWidth: 4,
        borderColor: COLOR.white,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
})