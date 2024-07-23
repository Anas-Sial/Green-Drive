import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts'
import { COLOR } from '../../enums/StyleGuide'
import { Bookings, Header } from '../../components'
import firestore from '@react-native-firebase/firestore'
import { FIREBASE_COLLECTION } from '../../enums/AppEnums'
import { getDocumentData } from '../../utils/firebaseServices'

const HistoryScreen = () => {
    const [bookings, setBookings] = useState([])
    const { userData } = useAuth()

    useEffect(() => {
        getMyBookings()
    }, [])

    const getMyBookings = async () => {
        let data = []
        let querySnapshot = await firestore()
            .collection(FIREBASE_COLLECTION.BOOKINGS)
            .where('user', '==', userData?.uid)
            .get()

        const docs = querySnapshot.docs
        const now = new Date()

        for (const doc of docs) {
            if (doc.exists) {
                const bookingData = doc.data()
                const bookingDate = bookingData.date.toDate()
                if (bookingDate < now) {
                    try {
                        const foundStation = await getDocumentData(FIREBASE_COLLECTION.STATIONS, bookingData?.stationId)
                        if (foundStation) {
                            data.push({ ...bookingData, stationDetails: foundStation })
                        } else {
                            data.push(bookingData)
                        }
                    } catch (error) {
                        console.log('Error fetching station data:', error)
                        data.push(bookingData)
                    }
                }
            } else {
                console.log('No document found!')
            }
        }

        setBookings(data)
    }

    return (
        <View style={styles.container}>
            <Header
                title='History'
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

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.fadeWhite
    }
})
