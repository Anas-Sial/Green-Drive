import { LogBox, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import En from '../../locales/En'
import { FIREBASE_COLLECTION } from '../../enums/AppEnums'
import { getAllOfCollectiondoublewhere, getDocumentData } from '../../utils/firebaseServices'
import { COLOR, commonStyles, hp, TEXT_STYLE, wp } from '../../enums/StyleGuide'
import { AnyIcon, Image, Label, OptionsModal, Pressable, Scrollable, StationProfileHeader } from '../../components'
import { useApp, useAuth } from '../../contexts'
import { showFlash } from '../../utils/Helpers'
import { ICONS } from '../../assets/svg'

const StationDetailScreen = ({ route }) => {
    const [showModal, setShowModal] = useState(false)
    const stationId = route?.params?.stationId
    const [station, setStation] = useState({})
    const [existingFavorite, setExistingFavorite] = useState({})
    const { userData } = useAuth()
    const { likeProfile, disLikeProfile } = useApp()

    const formateDate = () => {
        if (station?.createdAt) {
            const date = station?.createdAt?.toDate()
            const formattedDate = moment(date)?.format('ddd, MMM Do, YYYY')
            return formattedDate
        }
    }

    useEffect(() => {
        getSelectedStation()
        fetchFavorites()
    }, [])

    const getSelectedStation = async () => {
        const data = await getDocumentData(FIREBASE_COLLECTION.STATIONS, stationId)
        if (data) {
            setStation(data)
        }
    }

    const fetchFavorites = async () => {
        const favorites = await getAllOfCollectiondoublewhere(FIREBASE_COLLECTION.FAVORITE, 'likedBy', userData?.uid, 'profileId', stationId)
        if (favorites?.length >= 1) {
            setExistingFavorite(favorites[0])
        }
    }

    const handleLikeProfile = async () => {
        if (existingFavorite?.documentId) {
            await disLikeProfile(existingFavorite?.documentId)
            setExistingFavorite({})
            showFlash(En.dislikeMessage)
        } else {
            await likeProfile(stationId)
            showFlash(En.likeMessage)
        }
        fetchFavorites()
    }

    return (
        <View style={commonStyles.mainContainer}>

            <Scrollable containerStyle={{ paddingBottom: hp(4) }}>

                <StationProfileHeader
                    coverImage={station?.stationImages?.[0]?.uri}
                    image={station?.profileImage?.uri}
                    onOptionPress={() => setShowModal(true)}
                />

                <View style={styles.introView}>
                    <Label style={styles.heading}>{station?.stationName}</Label>
                    <Label style={styles.text}>
                        {`${station?.hostName} . `}
                        <Label style={styles.text} color={COLOR.blue}>{`Joined ${formateDate()}`}</Label>
                    </Label>

                    <View style={styles.textRow}>
                        <View style={styles.featureTab}>
                            <Label style={styles.heading}>{'4.5'}</Label>
                            <Label style={styles.text}>{En.rating}</Label>
                        </View>
                        <View style={styles.featureTab}>
                            <Label style={styles.heading}>{'24/7'}</Label>
                            <Label style={styles.text}>{En.available}</Label>
                        </View>
                    </View>

                </View>

                <Label style={styles.label}>{'Profile Details'}</Label>

                <View style={styles.box}>
                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'Host name'}</Label>
                        <Label style={styles.valueText}>{station?.hostName}</Label>
                    </View>

                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'Email'}</Label>
                        <Label style={styles.valueText}>{station?.email}</Label>
                    </View>

                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'Charges'}</Label>
                        <Label style={styles.valueText}>Rs. {station?.perUnitPrice}/kWh</Label>
                    </View>

                </View>

                <Label style={styles.label}>{'Location'}</Label>

                <View style={styles.box}>
                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'Address'}</Label>
                        <Label style={styles.valueText}>{station?.location?.address}</Label>
                    </View>

                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'State'}</Label>
                        <Label style={styles.valueText}>{station?.state}</Label>
                    </View>

                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'City'}</Label>
                        <Label style={styles.valueText}>{station?.city}</Label>
                    </View>

                    <View style={styles.item}>
                        <Label style={styles.keyText}>{'Zip Code'}</Label>
                        <Label style={styles.valueText}>{station?.zipCode}</Label>
                    </View>

                </View>

                <Label style={styles.label}>{'Site images'}</Label>

                <Scrollable horizontal={true}>
                    {station?.stationImages?.map((item, index) => (
                        <Image
                            key={index}
                            source={{ uri: item?.uri }}
                            style={styles.stationImages}
                        />
                    ))}
                </Scrollable>

            </Scrollable>

            <Pressable style={styles.likeButton} onPress={handleLikeProfile}>
                <AnyIcon
                    name={existingFavorite?.documentId ? 'favorite' : 'favorite-border'}
                    type={ICONS.MaterialIcons}
                    color={existingFavorite?.documentId ? COLOR.red : COLOR.gray_2}
                    onPress={handleLikeProfile}
                />
            </Pressable>

            <OptionsModal visible={showModal} setVisible={setShowModal} station={station} />

        </View>
    )
}

export default StationDetailScreen

const styles = StyleSheet.create({
    heading: {
        ...TEXT_STYLE.bigTextSemiBold,
        color: COLOR.black,
        marginBottom: -1,
    },
    label: {
        ...TEXT_STYLE.bigTextSemiBold,
        color: COLOR.black,
        marginTop: hp(2),
        marginBottom: hp(1),
        paddingHorizontal: '5%',
    },
    text: {
        ...TEXT_STYLE.textMedium,
        color: COLOR.black,
    },
    introView: {
        alignSelf: 'center',
        alignItems: 'center',
    },
    textRow: {
        ...commonStyles.horizontalView,
        marginTop: hp(0.2),
    },
    featureTab: {
        alignItems: 'center',
        marginHorizontal: '2%',
    },
    box: {
        backgroundColor: COLOR.lightGrey_2,
        paddingHorizontal: '5%',
        marginHorizontal: '5%',
        borderRadius: hp(1.5),
        paddingVertical: hp(1.5),
    },
    heading: {
        ...TEXT_STYLE.bigTextBold,
        color: COLOR.black,
        paddingHorizontal: '5%',
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR.white,
        paddingBottom: hp(1),
    },
    keyText: {
        ...TEXT_STYLE.smallText,
        color: COLOR.grey,
    },
    valueText: {
        ...TEXT_STYLE.textSemiBold,
        fontSize: 16,
        color: COLOR.darkGrey,
    },
    stationImages: {
        width: hp(25),
        height: hp(15),
        borderRadius: hp(2),
        marginLeft: wp(4),
        backgroundColor: 'red',
    },
    likeButton: {
        height: hp(6),
        width: hp(6),
        borderRadius: hp(6),
        backgroundColor: COLOR.white,
        ...commonStyles.shadow_5,
        position: 'absolute',
        bottom: hp(5),
        right: '5%',
        ...commonStyles.center,
    },
})