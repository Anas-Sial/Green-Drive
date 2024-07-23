import { StyleSheet, View } from 'react-native'
import React from 'react'
import En from '../../locales/En'
import { useAuth } from '../../contexts'
import { LogoutIcon } from '../../assets/svg'
import { settingsData } from '../../data/local'
import { COLOR, commonStyles, hp, TEXT_STYLE } from '../../enums/StyleGuide'
import { Header, Label, Scrollable, SettingProfileView, SettingsView } from '../../components'

const SettingScreen = () => {
  const { logoutUser } = useAuth()
  return (
    <View style={commonStyles.mainContainer}>
      <Header title={En.settings} addRight={<LogoutIcon onPress={() => logoutUser()} />} />
      <Scrollable>

        <SettingProfileView />

        <View style={styles.layout}>
          <Label style={styles.heading}>{En.preferences}</Label>

          {settingsData.slice(0, 2).map((item, index) => (
            <SettingsView key={index} item={item} />
          ))}

          <Label style={styles.heading}>{En.helpAndSupport}</Label>

          {settingsData.slice(2).map((item, index) => (
            <SettingsView key={index} item={item} />
          ))}

        </View>
      </Scrollable>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  heading: {
    ...TEXT_STYLE.bigTextSemiBold,
    color: COLOR.dark,
    marginTop: hp(0.5),
  },
  layout: {
    paddingHorizontal: '5%',
  },
})  