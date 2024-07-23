import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR, commonStyles } from '../../enums/StyleGuide'

const SplashScreen = () => {
    return (
        <View style={styles.mainScreen}>
            <ActivityIndicator color={COLOR.primary} size={'large'} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        backgroundColor: COLOR.white,
        ...commonStyles.center,
    },
})