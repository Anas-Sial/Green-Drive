import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bookings, Header } from '../../components'
import { COLOR } from '../../enums/StyleGuide'
import firestore from '@react-native-firebase/firestore'
import { FIREBASE_COLLECTION } from '../../enums/AppEnums'
import { useAuth } from '../../contexts'
import { getDocumentData } from '../../utils/firebaseServices'
import { useIsFocused } from '@react-navigation/native'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const { userData } = useAuth()
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    getMyBookings()
  }, [isFocused])

  const getMyBookings = async () => {
    let data = []
    setLoading(true)
    let querySnapshot = await firestore()
      .collection(FIREBASE_COLLECTION.BOOKINGS)
      .where('user', '==', userData?.uid)
      .get()

    const docs = querySnapshot.docs

    for (const doc of docs) {
      if (doc.exists) {
        const bookingData = doc.data()
        const bookingDate = bookingData.date.toDate()
        if (bookingDate > new Date()) {
          try {
            const foundUser = await getDocumentData(FIREBASE_COLLECTION.STATIONS, bookingData?.stationId)
            if (foundUser?.uid) {
              data.push({ ...bookingData, stationDetails: foundUser })
            } else {
              data.push(bookingData)
            }
          } catch (error) {
            console.log('Error fetching user data:', error)
            data.push(bookingData)
          }
        }
      } else {
        console.log('No document found!')
      }
    }

    setBookings(data)
    setLoading(false)
  }

  return (
    <View style={styles.container}>

      <Header
        title='My Bookings'
        addLeft
      />

      <FlatList
        data={bookings}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.documentId?.toString()}
        renderItem={({ item, index }) => <Bookings item={item} index={index} />}
      />

    </View>
  )
}

export default MyBookings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.fadeWhite
  }
})