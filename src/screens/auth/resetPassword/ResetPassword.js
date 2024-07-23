import { StyleSheet, View } from 'react-native'
import React from 'react'
import En from '../../../locales/En'
import { Button, Header, Input, Label, Scrollable } from '../../../components'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'

const ResetPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Scrollable hasInput>

        <Header title={En.resetPassword} backButton />

        <View style={styles.infoContainer}>
          <Label style={styles.message}>{En.enterEmailForVerification}</Label>
          <Input placeholder={En.enterNewPassword}
          />
          <Input placeholder={En.confirmPassword}
          />
        </View>

        <View style={styles.subContainer}>
          <Button
            // onPress={() => navigation.navigate(SCREEN.SUCCESS, { reset: true })}
            title={En.changePassword}
            style={{ marginTop: hp(5) }} />
        </View>

      </Scrollable>

    </View>
  )
}

export default ResetPassword

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