import { StyleSheet, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../assets/images'
import { Image, Label, Pressable } from '../reusables'
import { ClockSvg, LocationSVG, RatingStar } from '../../assets/svg'
import { COLOR, FONT, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'

const Bookings = ({ item, index }) => {
  const station = item?.stationDetails

  return (
    <Pressable style={styles.stationContainer}>
      <Image source={station?.profileImage?.uri ? { uri: station?.profileImage?.uri } : IMAGES.cars} style={styles.stationImage} />
      <View style={styles.cardChild}>
        <Label style={styles.stationName}>{station?.stationName}</Label>
        <View style={styles.location}>
          <LocationSVG />
          <Label numberOfLines={1} style={styles.locationLabel}>{station?.location?.address}</Label>
        </View>
        <View style={styles.location}>
          <ClockSvg />
          <Label style={styles.dateTime}>{item?.date?.toDate()?.toLocaleDateString()}</Label>
        </View>
        <View style={styles.location}>
          <ClockSvg />
          <Label style={styles.dateTime}>{item?.time?.toDate()?.toLocaleTimeString()}</Label>
        </View>
        <View style={styles.location}>
          <RatingStar />
          {/* <Label style={styles.dateTime}>{4.5}</Label> */}
          <Label style={styles.totalReviews}>100 (4.5)</Label>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Label style={styles.price}>Rs. {item?.totalCost}</Label>
      </View>
    </Pressable>
  )
}

export default Bookings

const styles = StyleSheet.create({
  stationContainer: {
    width: wp(90),
    height: hp(18),
    backgroundColor: COLOR.lightGrey_2,
    marginLeft: wp(3),
    borderRadius: hp(2.5),
    ...commonStyles.horizontalView,
    paddingHorizontal: wp(3),
    marginTop: hp(1.5)
  },
  cardChild: {
    flex: 1,
    marginLeft: wp(2),
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