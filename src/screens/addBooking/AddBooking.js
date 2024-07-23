import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import En from '../../locales/En'
import { useAuth } from '../../contexts'
import { handleResetStack, showFlash } from '../../utils/Helpers'
import { durationsData } from '../../data/local'
import { addDocument } from '../../utils/firebaseServices'
import { FIREBASE_COLLECTION } from '../../enums/AppEnums'
import { COLOR, TEXT_STYLE, hp, wp, commonStyles } from '../../enums/StyleGuide'
import { BillInformation, Button, DatePicker, DropDown, Header, Label, Scrollable, TimePicker } from '../../components'

const AddBooking = ({ route, navigation }) => {
  const station = route?.params?.station
  const { userData } = useAuth()
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [duration, setDuration] = useState(durationsData[0])
  const [loading, setLoading] = useState(false)

  const onConfirmBooking = async () => {
    if (date && time && duration?.value && duration?.label) {
      setLoading(true)

      const formattedData = {
        date,
        time,
        duration: { label: duration?.label, value: duration?.value },
        perUnitPrice: station?.perUnitPrice,
        totalCost: station?.perUnitPrice * duration?.value,
        user: userData?.uid,
        stationId: station?.uid,
      }

      await addDocument(FIREBASE_COLLECTION.BOOKINGS, formattedData)
      setLoading(false)
      showFlash('Booking registered successfully!')
      navigation.goBack()
    } else {
      showFlash('Please fill in all of the required data')
    }
  }

  return (
    <View style={styles.container}>
      <Scrollable>
        <Header title={En.booking} backButton />

        <Label style={styles.inputLabel}>{En.bookigDate}</Label>
        <DatePicker value={date} onChange={setDate} />

        <Label style={styles.inputLabel}>{En.selectTime}</Label>
        <TimePicker value={time} onSelect={setTime} />

        <Label style={styles.inputLabel}>{En.duration}</Label>
        <DropDown
          data={durationsData}
          selected={duration}
          onSelect={setDuration}
        />

        <Label style={styles.infoLabel}>{En.billInformation}</Label>
        <BillInformation
          discount='0.00'
          duration={duration?.label}
          chargingRate={station?.perUnitPrice}
          totalCost={station?.perUnitPrice * duration?.value}
        />

        <Button
          title={En.confirmBooking}
          isLoading={loading}
          style={{ marginTop: hp(15) }}
          onPress={onConfirmBooking}
        />

      </Scrollable>
    </View>
  )
}

export default AddBooking

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.fadeWhite
  },
  input: {
    marginTop: 0
  },
  inputLabel: {
    ...TEXT_STYLE.textMedium,
    color: COLOR.black,
    marginLeft: wp(5),
    marginTop: hp(.3)
  },
  nameFields: {
    ...commonStyles.justifyView,
    width: wp(92),
    alignSelf: 'center',
  },
  nameInput: {
    width: wp(42),
    marginTop: 0
  },
  infoLabel: {
    ...TEXT_STYLE.bigTextSemiBold,
    color: COLOR.black,
    marginLeft: wp(5),
    marginTop: hp(1.5)
  },
})