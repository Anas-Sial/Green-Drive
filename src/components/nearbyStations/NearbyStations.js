import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { SCREEN } from '../../enums/AppEnums'
import { Image, Label, Pressable } from '../reusables'
import { useNavigation } from '@react-navigation/native'
import { ClockSvg, LocationSVG, RatingStar } from '../../assets/svg'
import { COLOR, FONT, hp, wp, TEXT_STYLE, commonStyles } from '../../enums/StyleGuide'
import moment from 'moment'

const NearbyStations = ({ item }) => {
  const navigation = useNavigation()
  const date = item?.createdAt.toDate()
  const formattedDate = moment(date).format('ddd, MMM Do, YYYY')
  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.stationContainer} onPress={() => navigation.navigate(SCREEN.STATION_DETAIL, { stationId: item?.uid })}>
        <Image source={{ uri: item?.profileImage?.uri }} style={styles.stationImage} />
        <View style={styles.cardChild}>
          <Label style={styles.stationName}>{item?.stationName}</Label>
          <View style={styles.location}>
            <LocationSVG />
            <Label numberOfLines={1} style={styles.locationLabel}>{item?.state}</Label>
          </View>
          <View style={styles.location}>
            <ClockSvg />
            <Label style={styles.dateTime}>{formattedDate || 'Monday 2, 2024 3:20 pm'}</Label>
          </View>
          <View style={styles.location}>
            <RatingStar />
            <Label style={styles.dateTime}>{'3.5'}</Label>
            <Label style={styles.totalReviews}>({'200'})</Label>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Label style={styles.price}>Rs. {item?.perUnitPrice}</Label>
        </View>
      </Pressable>
    </View>
  )
}

export default memo(NearbyStations)

const styles = StyleSheet.create({
  outerContainer: {
    width: wp(100),
    alignItems: 'center',
  },
  stationContainer: {
    width: '90%',
    height: hp(18),
    backgroundColor: COLOR.white,
    marginLeft: wp(3),
    borderRadius: hp(2.5),
    ...commonStyles.horizontalView,
    paddingHorizontal: wp(3)
  },
  cardChild: {
    marginLeft: wp(2)
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
    flex: 1,
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