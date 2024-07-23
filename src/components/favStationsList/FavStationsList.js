import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AnyIcon, Image, Label, Pressable } from '../reusables'
import { ClockSvg, HeartSvg, ICONS, LocationSVG, RatingStar } from '../../assets/svg'
import { IMAGES } from '../../assets/images'
import { COLOR, FONT, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../enums/AppEnums'
import { useApp } from '../../contexts'
import { showFlash } from '../../utils/Helpers'
import En from '../../locales/En'

const FavStationsList = ({ item }) => {
  const navigation = useNavigation()
  const { disLikeProfile } = useApp()

  const handleOnPress = () => {
    navigation.navigate(SCREEN.STATION_DETAIL, { stationId: item?.uid })
  }

  const handelDisLike = () => {
    disLikeProfile(item?.documentId)
    showFlash(En.dislikeMessage)
  }

  return (
    <Pressable style={styles.stationContainer} onPress={handleOnPress}>
      <Pressable style={styles.unfavCard} onPress={handelDisLike}>
        <AnyIcon
          name={'favorite'}
          color={COLOR.red}
          type={ICONS.MaterialIcons}
          onPress={handelDisLike}
        />
      </Pressable>
      <Image source={item?.profileImage?.uri ? { uri: item?.profileImage?.uri } : IMAGES.cars} style={styles.stationImage} />
      <View style={styles.cardChild}>
        <Label style={styles.stationName}>{item?.name}</Label>
        <View style={styles.location}>
          <LocationSVG />
          <Label numberOfLines={1} style={styles.locationLabel}>{item?.address}</Label>
        </View>
        {/* <View style={styles.location}>
          <ClockSvg />
          <Label style={styles.dateTime}>{item?.dateTime}</Label>
        </View> */}
        <View style={styles.location}>
          <RatingStar />
          {/* <Label style={styles.dateTime}>{item?.rating}</Label> */}
          <Label style={styles.totalReviews}>100(4.5)</Label>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Label style={styles.price}>${item?.price}</Label>
      </View>
    </Pressable>
  )
}

export default FavStationsList

const styles = StyleSheet.create({
  stationContainer: {
    width: wp(90),
    height: hp(18),
    backgroundColor: COLOR.white,
    marginLeft: wp(3),
    borderRadius: hp(2.5),
    ...commonStyles.horizontalView,
    paddingHorizontal: wp(3),
    marginTop: hp(1.5)
  },
  unfavCard: {
    position: 'absolute',
    top: hp(.8),
    right: wp(3)
  },
  cardChild: {
    flex: 1,
    marginLeft: wp(2),
    marginTop: hp(3)
  },
  stationImage: {
    width: hp(16),
    height: hp(15),
    borderRadius: hp(3)
  },
  stationName: {
    ...TEXT_STYLE.bigTextBold,
    color: COLOR.dark
  },
  location: {
    ...commonStyles.horizontalView,
    marginTop: hp(.3)
  },
  locationLabel: {
    ...TEXT_STYLE.smallText,
    color: COLOR.dark,
    marginLeft: wp(2)
  },
  dateTime: {
    ...TEXT_STYLE.smallTextMedium,
    color: COLOR.dark,
    marginLeft: wp(2)
  },
  totalReviews: {
    ...TEXT_STYLE.smallTextMedium,
    color: COLOR.grey,
    marginLeft: wp(1)
  },
  priceContainer: {
    backgroundColor: COLOR.primary,
    height: hp(2.5),
    paddingHorizontal: wp(2),
    position: 'absolute',
    bottom: hp(1.5),
    right: wp(2.5),
    borderRadius: hp(.5),
    ...commonStyles.center
  },
  price: {
    fontFamily: FONT.medium,
    fontSize: 10,
    color: COLOR.white,
  }
})