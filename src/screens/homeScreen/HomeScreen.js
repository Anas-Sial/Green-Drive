import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import En from '../../locales/En'
import { useApp } from '../../contexts'
import { useSearch } from '../../hooks'
import { TargetSVG } from '../../assets/svg'
import Geolocation from 'react-native-geolocation-service'
import { hp, commonStyles, wp, COLOR } from '../../enums/StyleGuide'
import { handleLocationRequest, showFlash } from '../../utils/Helpers'
import { Input, Map, NearbyStations, Pressable } from '../../components'

const HomeScreen = () => {
  const { allStations } = useApp()
  const [lat, setLat] = useState(28.4212)
  const [long, setLong] = useState(70.2989)
  const [loading, setLoading] = useState(false)
  const flatListRef = useRef()
  const [searchResults, { search, handleSearch }] = useSearch(allStations, 'stationName')

  useEffect(() => {
    handleLocation()
  }, [])

  const handleLocation = () => {
    handleLocationRequest(getCurrentLocation)
  }

  const getCurrentLocation = () => {
    try {
      setLoading(true)
      Geolocation.getCurrentPosition(
        async (position) => {
          if (position?.coords) {
            setLat(position?.coords?.latitude)
            setLong(position.coords?.longitude)
          }
        },
        (error) => {
          console.log('Error getting current location:', error)
          if (error?.message) {
            showFlash(error.message)
          }
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      )
    }
    catch (e) {
      console.log('catch block error:', e)
    }
    finally {
      setLoading(false)
    }
  }

  const moveToStation = useCallback(async (index) => {
    await flatListRef?.current?.scrollToIndex({ animated: true, index })
  }, [flatListRef?.current])

  return (
    <View style={styles.container}>

      <Map lat={lat} long={long} data={searchResults} onSelect={moveToStation} />

      <View style={styles.headerContainer}>
        <Input
          value={search}
          onChange={handleSearch}
          placeholder={En.searchChargingStation}
          style={styles.inputContainer}
          textStyle={styles.inputLabel}
        />
        <Pressable style={styles.target} onPress={() => handleLocation()}>
          {loading ?
            <ActivityIndicator color={COLOR.blue} />
            :
            <TargetSVG />
          }
        </Pressable>
      </View>

      <View style={styles.stationContainer}>
        <FlatList
          ref={flatListRef}
          data={searchResults}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item?.uid?.toString()}
          horizontal
          pagingEnabled
          renderItem={({ item, index }) => <NearbyStations item={item} index={index} />}
        />
      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    position: 'absolute',
    ...commonStyles.justifyView_m05,
    width: '94%',
    alignSelf: 'center'
  },
  inputContainer: {
    width: wp(78),
    borderRadius: hp(4),
    height: hp(6),
    borderWidth: 0,
    ...commonStyles.shadow_20
  },
  inputLabel: {
    fontSize: 14,
    top: hp(.3)
  },
  target: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(6) / 2,
    backgroundColor: COLOR.white,
    ...commonStyles.center,
    ...commonStyles.shadow_20
  },
  stationContainer: {
    position: 'absolute',
    bottom: hp(3),
  }

})