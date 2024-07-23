import { Dimensions, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('window').height

export { wp, hp }

export const ACTIVE_OPACITY = 0.8
export const BACKDROP_OPACITY = 0.2

export const COLOR = {
    white: '#ffffff',
    dark: '#000000',
    primary: '#6DD5B3',
    black: '#33373E',
    darkGrey: '#4C4D4C',
    grey: '#65676A',
    lightGrey: '#d3d3d3',
    orange: '#FCA039',
    fadeWhite: '#F9FAFC',
    darkBlue: '#396FFC',
    gray_2: '#ABA7B0',
    gray_3: '#D9D9D9',
    lightblue: '#DFE4EF',
    lightGrey_2: '#EDF3F9',
    dullGrey: '#EDEDE8',
    blue: '#396FFC',
    red: '#FF0000'
}

export const FONT = {
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
    semiBold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
}

export const TEXT_STYLE = StyleSheet.create({
    titleBold: {
        fontFamily: FONT.bold,
        fontSize: 22,
    },
    smallTitleBold: {
        fontFamily: FONT.bold,
        fontSize: 20,
    },
    smallTitleSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 20,
    },
    smallTitleMedium: {
        fontFamily: FONT.medium,
        fontSize: 20,
    },
    bigText: {
        fontFamily: FONT.regular,
        fontSize: 16,
    },
    bigTextSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 16,
    },
    bigTextMedium: {
        fontFamily: FONT.medium,
        fontSize: 16,
    },
    bigTextBold: {
        fontFamily: FONT.bold,
        fontSize: 16,
    },
    bigTextBold_2: {
        fontFamily: FONT.bold,
        fontSize: 15,
    },
    bigText_2: {
        fontFamily: FONT.regular,
        fontSize: 15,
    },
    text: {
        fontFamily: FONT.regular,
        fontSize: 13,
    },
    textSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 13,
    },
    textMedium: {
        fontFamily: FONT.medium,
        fontSize: 13,
    },
    textBold: {
        fontFamily: FONT.bold,
        fontSize: 13,
    },
    smallText: {
        fontFamily: FONT.regular,
        fontSize: 12,
    },
    smallTextSemiBold: {
        fontFamily: FONT.semiBold,
        fontSize: 12,
    },
    smallTextMedium: {
        fontFamily: FONT.medium,
        fontSize: 12,
    },
    smallTextBold: {
        fontFamily: FONT.bold,
        fontSize: 12,
    },
})

export const commonStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLOR.fadeWhite,
    },
    horizontalView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    horizontalView_m05: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(0.5),
    },
    horizontalView_m1: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp(1),
    },
    justifyView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    justifyView_m05: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(0.5),
    },
    justifyView_m1: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(1),
    },
    justifyView_m2: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: hp(2),
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow_5: {
        elevation: 5,
        shadowColor: COLOR.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    shadow_3: {
        elevation: 3,
        shadowColor: COLOR.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    shadow_10: {
        elevation: 10,
        shadowColor: COLOR.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    shadow_20: {
        elevation: 20,
        shadowColor: COLOR.black,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
    },
    noPadding: {
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingStart: 0,
        paddingEnd: 0,
    },
    noMargin: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginStart: 0,
        marginEnd: 0,
    },
}) 
