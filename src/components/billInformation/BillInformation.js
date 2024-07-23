import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Label } from '../reusables'
import { COLOR, FONT, hp, wp, commonStyles } from '../../enums/StyleGuide'
import En from '../../locales/En'

const BillInformation = (props) => {
    const { chargingRate, discount, duration, totalCost } = props
    return (
        <View style={styles.billContainer}>
            <View style={styles.subContainer}>
                <Label style={styles.rate}>{En.chargingRate}</Label>
                <Label style={styles.cost}>Rs. {chargingRate} /kWh</Label>
            </View>

            <View style={[styles.subContainer, { marginTop: hp(.5) }]}>
                <Label style={styles.rate}>{En.discount}</Label>
                <Label style={styles.cost}>${discount}</Label>
            </View>

            <View style={[styles.subContainer, { marginTop: hp(.5) }]}>
                <Label style={styles.rate}>{En.timeDuration}</Label>
                <Label style={styles.cost}>{duration}</Label>
            </View>
            <View style={styles.underLine} />

            <View style={styles.subContainer}>
                <Label style={[styles.rate, { fontFamily: FONT.bold }]}>{En.total}</Label>
                <Label style={[styles.cost, { fontFamily: FONT.bold }]}>${totalCost}</Label>
            </View>

        </View>
    )
}

export default BillInformation

const styles = StyleSheet.create({
    billContainer: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(2),
        backgroundColor: COLOR.lightGrey_2,
        borderRadius: hp(1),
        width: wp(92),
        alignSelf: 'center'
    },
    subContainer: {
        ...commonStyles.justifyView
    },
    rate: {
        fontFamily: FONT.medium,
        fontSize: 15,
        color: COLOR.black
    },
    cost: {
        fontFamily: FONT.regular,
        fontSize: 15,
        color: COLOR.black
    },
    underLine: {
        width: wp(88),
        alignSelf: 'center',
        height: 1,
        backgroundColor: COLOR.white,
        marginVertical: hp(1.7)
    }
})