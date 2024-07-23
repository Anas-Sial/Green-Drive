import { View } from 'react-native'
import React, { useState } from 'react'
import En from '../../../locales/En'
import { useAuth } from '../../../contexts'
import { showFlash } from '../../../utils/Helpers'
import { commonStyles, hp } from '../../../enums/StyleGuide'
import { Button, Header, NumberPicker, Scrollable } from '../../../components'

const VerifyPhone = () => {
    const [countryCode, setCountryCode] = useState('+1')
    const [number, setNumber] = useState('650-555-3434')
    const { loading, sendOtpToNumber } = useAuth()

    const onVerifyPress = async () => {
        if (countryCode && number) {
            sendOtpToNumber(`${countryCode} ${number}`)
        } else {
            showFlash('Please enter a valid number')
        }
    }

    return (
        <View style={commonStyles.mainContainer}>
            <Scrollable hasInput>

                <Header title={En.verifyPhoneNumber} />

                <NumberPicker
                    number={number}
                    code={countryCode}
                    setNumber={setNumber}
                    setCode={setCountryCode}
                />

                <Button
                    title={En.verify}
                    isLoading={loading}
                    style={{ marginTop: hp(2.5) }}
                    onPress={() => onVerifyPress()}
                />

            </Scrollable>
        </View>
    )
}

export default VerifyPhone
