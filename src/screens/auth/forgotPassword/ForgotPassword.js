import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import En from '../../../locales/En'
import { Button, Header, Input, Label, Scrollable } from '../../../components'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { useAuth } from '../../../contexts'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const { loading, resetPassword } = useAuth()

    const onVerifyPress = async () => {
        if (email) {
          resetPassword(email)
        } else {
            showFlash('Please enter a valid email')
        }
    }


  return (
    <View style={styles.container}>
      <Scrollable hasInput>

        <Header title={En.forgotHeader} backButton />

        <View style={styles.infoContainer}>
          <Label style={styles.message}>{En.enterEmailForVerification}</Label>
          <Input placeholder={En.emailPlaceholder}
            value={email}
            onChange={(x) => setEmail(x)}
          />
        </View>

        <View style={styles.subContainer}>
          <Button
            isLoading={loading}
            onPress={() => onVerifyPress()}
            title={En.sendCode}
            style={{ marginTop: hp(5) }} />
        </View>

      </Scrollable>

    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    ...commonStyles.mainContainer,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: hp(1)
  },
  message: {
    ...TEXT_STYLE.bigTextMedium,
    color: COLOR.black,
    width: wp(90),

  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: hp(6)
  }
})