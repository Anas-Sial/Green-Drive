import { StyleSheet, View } from 'react-native'
import React, { memo } from 'react'
import { Image, Label } from '../reusables'
import { TEXT_STYLE, hp, COLOR, wp } from '../../enums/StyleGuide'
import { IMAGES } from '../../assets/images'
import moment from 'moment'

const MessageView = ({ item }) => {
    const { timestamp, text, sentBy } = item

    const CURRENT_USER_ID = '1'

    const formattedTime = moment(timestamp).format('hh:mm a')

    const isReceived = sentBy === CURRENT_USER_ID

    return (
        <View style={[styles.container, { flexDirection: isReceived ? 'row-reverse' : 'row' }]}>

            <Image source={IMAGES.dummyUser} style={styles.profileImage} />

            <View style={styles.contentContainer}>

                <View style={[styles.messageContainer, !isReceived && styles.sender]}>
                    <Label style={[styles.text, isReceived && styles.rightText]}>{text}</Label>

                    <Label style={[styles.timeText, isReceived && styles.rightText]}>{formattedTime}</Label>
                </View>

            </View>

        </View>
    )
}

export default memo(MessageView)

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(1),
        marginHorizontal: '5%',
    },
    profileImage: {
        height: hp(5.5),
        width: hp(5.5),
        borderRadius: hp(5.5),
    },
    contentContainer: {
        maxWidth: '75%',
        marginHorizontal: wp(2),
    },
    messageContainer: {
        minWidth: wp(17),
        borderRadius: hp(1),
        borderTopRightRadius: 0,
        paddingVertical: hp(1),
        marginTop: hp(2),
        paddingHorizontal: wp(2),
        backgroundColor: COLOR.lightGrey_2,
        paddingBottom: 0,
    },
    sender: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: hp(1),
        backgroundColor: COLOR.dullGrey,
    },
    text: {
        ...TEXT_STYLE.textMedium,
    },
    timeText: {
        ...TEXT_STYLE.smallText,
        fontSize: 9,
        color: COLOR.darkGrey,
        marginTop: hp(0.2),
    },
    rightText: {
        textAlign: 'right',
    },
})
