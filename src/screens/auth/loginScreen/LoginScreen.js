import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../../enums/StyleGuide'
import { Button, Image, Input, Label, Pressable, Scrollable } from '../../../components'
import { IMAGES } from '../../../assets/images'
import En from '../../../locales/En'
import { KEYBOARD_TYPE, SCREEN } from '../../../enums/AppEnums'
import { useAuth } from '../../../contexts'
import { isEmailValid } from '../../../utils/Helpers'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('anassial@gmail.com')
  const [password, setPassword] = useState('Anas69@a')
  const { loginUser, loading, user } = useAuth()

  const handleLogin = async () => {
    if (isEmailValid(email) && password) {
      loginUser(email, password)
    } else {
      if (!isEmailValid(email)) {
        showFlash(En.emailNotValid)
      } else {
        showFlash(En.emptyPassword)
      }
    }
  }

  return (
    <View style={{ ...commonStyles.mainContainer }}>
      <Scrollable hasInput>
        <Image source={IMAGES.appLabel} style={styles.appLabel} contain='true' />

        {/* Input Fields */}
        <View style={{ marginTop: hp(8) }}>

          <Input
            placeholder={En.emailPlaceholder}
            value={email}
            onChange={(x) => setEmail(x)}
            keyboard={KEYBOARD_TYPE.EMAIL}
          />

          <Input
            placeholder={En.password}
            value={password}
            onChange={(x) => setPassword(x)}
          />

          <Pressable style={styles.forgotButton} onPress={() => navigation.navigate(SCREEN.FORGOT)}>
            <Label style={styles.forgotLabel}>{En.forgotPassword}</Label>
          </Pressable>

          <Button
            title={En.login}
            isLoading={loading}
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <Label style={styles.continueLabel}>{En.orContinueWith}</Label>
        </View>

        {/* Facebook and Google Buttons */}
        <View style={styles.socialContainer}>
          {socialIcons.map((item, index) => (
            <Pressable style={styles.socialButton} key={index}>
              <Image source={item?.image} style={styles.buttonImage} />
            </Pressable>
          ))}
        </View>

        <View style={styles.bottomContainer}>
          <Label style={styles.accountLabel}>{En.doNotHaveAnAccount}</Label>
          <Pressable onPress={() => navigation.navigate(SCREEN.ROLE_SELECTION)}>
            <Label style={styles.registerLabel}>{' '}{En.register}</Label>
          </Pressable>
        </View>

      </Scrollable>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  appLabel: {
    width: hp(20),
    height: hp(12),
    marginTop: hp(12),
    alignSelf: 'center'
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginRight: wp(5)
  },
  forgotLabel: {
    ...TEXT_STYLE.smallTextMedium,
    color: COLOR.black
  },
  loginButton: {
    marginTop: hp(4)
  },
  continueLabel: {
    ...TEXT_STYLE.bigText_2,
    color: COLOR.grey,
    textAlign: 'center',
    marginTop: hp(2)
  },
  socialButton: {
    height: hp(8),
    width: hp(7.5),
    borderRadius: hp(1.2),
    backgroundColor: COLOR.white,
    ...commonStyles.center,
    borderWidth: 1,
    borderColor: COLOR.lightblue,
  },
  buttonImage: {
    height: hp(4),
    width: hp(4)
  },
  socialContainer: {
    ...commonStyles.justifyView_m2,
    alignSelf: 'center',
    width: wp(38),
    marginTop: hp(3)
  },
  bottomContainer: {
    ...commonStyles.horizontalView,
    alignSelf: 'center',
    marginTop: hp(10),
    marginBottom: hp(2)
  },
  accountLabel: {
    ...TEXT_STYLE.bigText_2,
    color: COLOR.grey,
  },
  registerLabel: {
    ...TEXT_STYLE.bigTextBold_2,
    color: COLOR.black
  }
})

const socialIcons = [
  { image: IMAGES.fbIcon },
  { image: IMAGES.googleIcon },
]