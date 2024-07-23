import { StyleSheet, View, Alert } from 'react-native'
import React, { useState } from 'react'
import En from '../../../locales/En'
import { useAuth } from '../../../contexts'
import { AddSvg, CameraSVG } from '../../../assets/svg'
import { IMAGES } from '../../../assets/images'
import { KEYBOARD_TYPE, SCREEN } from '../../../enums/AppEnums'
import { COLOR, commonStyles, hp, wp, TEXT_STYLE } from '../../../enums/StyleGuide'
import { Button, Header, Image, Input, Label, Pressable, Scrollable } from '../../../components'
import { isEmailValid, isStrongPassword, openCamera, openGallery, showFlash } from '../../../utils/Helpers'

const API_KEY = 'AIzaSyCtMocPe33q-JTrn3eI2dSG5ANqHWEcHxg'

const CreateStation = ({ navigation }) => {
  const [registerForm, setRegisterForm] = useState({})
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([])

  const { createStation, loading } = useAuth()

  const handleFormChange = (key, value) => {
    setRegisterForm({ ...registerForm, [key]: value })
  }

  const handleImagePick = () => {
    Alert.alert(En.selectImage, '', [
      { text: En.camera, onPress: () => selectImage(true) },
      { text: En.gallery, onPress: () => selectImage() },
      { text: En.cancel, onPress: () => { } },
    ])
  }

  const selectImage = async (isCamera) => {
    let image
    if (isCamera) {
      image = await openCamera()
    } else {
      image = await openGallery()
    }
    handleFormChange('profileImage', image?.path)
  }

  const handleAddImage = async () => {
    const image = await openGallery()
    setImages([...images, image.path])
  }

  const fetchSuggestions = (text) => {
    setQuery(text);
    if (text?.length >= 2) {
      try {
        fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${API_KEY}`,
        )
          .then(response => response.json())
          .then(data => {
            if (data?.predictions) {
              setSuggestions(data?.predictions)
            }
          })
          .catch(error => {
            console.error('Error fetching suggestions:', error)
          });
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion?.description)
    setSuggestions([])
    try {
      fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestion?.place_id}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data?.result) {
            handleFormChange('location', { coordinates: data?.result?.geometry?.location, address: data?.result?.formatted_address })
          }
        })
    } catch (error) {
      console.error('Error fetching place details:', error)
    }
  }

  const handleRegister = () => {
    let { hostName, stationName, email, city, state, zipCode, perUnitPrice, link, password, confirmPassword, location, profileImage } = registerForm
    const { address, coordinates } = location
    if (hostName && stationName && isEmailValid(email) && city && state && perUnitPrice && zipCode && isStrongPassword(password) && confirmPassword == password && address && coordinates && location && profileImage && images) {
      const mergedForm = { ...registerForm, stationImages: images }
      createStation(mergedForm)
    } else {
      if (!isEmailValid(email)) {
        showFlash('Enter a valid email')
      } else if (!isStrongPassword(password)) {
        showFlash('Enter a strong password')
      } else if (confirmPassword !== password) {
        showFlash('Password does not match')
      } else {
        showFlash(En.fillDataError)
      }
    }
  }
  return (
    <View style={commonStyles.mainContainer}>
      <Scrollable hasInput>

        <Header title={En.creatingNewAccount} backButton />

        <View style={styles.profileContainer}>
          <Image
            source={registerForm?.profileImage ? { uri: registerForm?.profileImage } : IMAGES.userImage}
            style={styles.userImage}
          />
          <Pressable style={styles.cameraIcon} onPress={() => handleImagePick()}>
            <CameraSVG />
          </Pressable>
        </View>

        <Input
          placeholder={En.hostName}
          value={registerForm?.hostName}
          onChange={(x) => handleFormChange('hostName', x)}
        />

        <Input
          placeholder={En.stationName}
          value={registerForm?.stationName}
          onChange={(x) => handleFormChange('stationName', x)}
        />

        <Input
          placeholder={En.email}
          keyboard={KEYBOARD_TYPE.EMAIL}
          value={registerForm?.email}
          onChange={(x) => handleFormChange('email', x)}
        />

        <Input placeholder={En.password}
          value={registerForm?.password}
          onChange={(x) => handleFormChange('password', x)}
        />

        <Input placeholder={En.confirmPassword}
          value={registerForm?.confirmPassword}
          onChange={(x) => handleFormChange('confirmPassword', x)}
        />

        <Input placeholder={En.streetAddress}
          value={query}
          onChange={fetchSuggestions}
        />

        {suggestions?.length > 0 ? (
          <View style={styles.addressView}>
            {suggestions.map((suggestion, index) => (
              <Pressable key={index} onPress={() => handleSelectSuggestion(suggestion)}>
                <Label style={styles.description}>{suggestion?.description}</Label>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View style={styles.locationFields}>
          <Input
            placeholder={En.city}
            style={styles.nameInput}
            value={registerForm?.city}
            onChange={(x) => handleFormChange('city', x)}
          />

          <Input
            placeholder={En.state}
            style={styles.nameInput}
            value={registerForm?.state}
            onChange={(x) => handleFormChange('state', x)}
          />

          <Input
            placeholder={En.zipCode}
            style={styles.nameInput}
            value={registerForm?.zipCode}
            onChange={(x) => handleFormChange('zipCode', x)}
          />
        </View>

        <Input placeholder={En.perUnitPrice}
          value={registerForm?.perUnitPrice}
          onChange={(x) => handleFormChange('perUnitPrice', x)}
          keyboard={KEYBOARD_TYPE.NUMERIC}
        />

        <Input placeholder={En.websiteLink}
          value={registerForm?.link}
          onChange={(x) => handleFormChange('link', x)}
        />
        <Input placeholder={En.websiteLink}
          value={registerForm?.link}
          onChange={(x) => handleFormChange('link', x)}
        />

        <Label style={styles.imageLabel}>{En.addImages}</Label>

        <Scrollable horizontal={true}>
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.stationImages} />
            ))}
            <Pressable style={styles.addButton} onPress={() => handleAddImage()}>
              <AddSvg />
            </Pressable>
          </View>
        </Scrollable>

        <Button
          title={En.signUp}
          isLoading={loading}
          onPress={() => handleRegister()}
          style={{ marginTop: hp(2.5) }}
        />

        <View style={styles.bottomContainer}>
          <Label style={styles.accountLabel}>{En.alreadyHaveAnAccount}</Label>
          <Pressable onPress={() => navigation.navigate(SCREEN.LOGIN)}>
            <Label style={styles.registerLabel}>{' '}{En.login}</Label>
          </Pressable>
        </View>

      </Scrollable>
    </View>
  )
}

export default CreateStation

const styles = StyleSheet.create({
  profileContainer: {
    alignSelf: 'center',
    marginTop: hp(.7)
  },
  userImage: {
    height: hp(14),
    width: hp(14),
    borderRadius: hp(14) / 2
  },
  cameraIcon: {
    position: 'absolute',
    bottom: '4%',
    right: '2%'
  },
  locationFields: {
    ...commonStyles.justifyView,
    width: wp(92),
    alignSelf: 'center',
  },
  nameInput: {
    width: wp(29),
  },
  bottomContainer: {
    ...commonStyles.horizontalView,
    alignSelf: 'center',
    marginTop: hp(9.5),
    marginBottom: hp(2)
  },
  accountLabel: {
    ...TEXT_STYLE.bigText_2,
    color: COLOR.grey,
  },
  registerLabel: {
    ...TEXT_STYLE.bigTextBold_2,
    color: COLOR.black
  },
  imageLabel: {
    ...TEXT_STYLE.bigTextMedium,
    color: COLOR.primary,
    marginLeft: wp(4.5),
    marginTop: hp(1)
  },
  imagesContainer: {
    ...commonStyles.horizontalView_m05
  },
  stationImages: {
    width: hp(25),
    height: hp(15),
    borderRadius: hp(2),
    marginLeft: wp(4)
  },
  addButton: {
    ...commonStyles.center,
    width: hp(8.5),
    height: hp(8.5),
    borderRadius: hp(2),
    backgroundColor: COLOR.gray_3,
    marginHorizontal: wp(4)
  },
  addressView: {
    width: wp(92),
    marginHorizontal: wp(5),
    borderWidth: hp(.5),
    borderRadius: hp(1),
    borderColor: COLOR.lightGrey_2,
    padding: hp(1.5),
    alignSelf: 'center',
    marginBottom: hp(.5),
  },
  description: {
    ...TEXT_STYLE.textSemiBold,
    color: COLOR.black,
  },
})