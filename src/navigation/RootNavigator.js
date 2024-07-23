import React from 'react'
import * as ui from '../screens'
import { useAuth } from '../contexts'
import { SCREEN } from '../enums/AppEnums'
import TabNavigation from './BottomNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const screenOptionStyle = {
    headerShown: false,
}

const RootNavigator = () => {
    const { user, showSplash, userData } = useAuth()
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            {showSplash ?
                <Stack.Screen name={SCREEN.SPLASH} component={ui.SplashScreen} />
                :
                !userData?.isPhoneVerified ?
                    !user?.uid ?
                        <>
                            <Stack.Screen name={SCREEN.LOGIN} component={ui.LoginScreen} />
                            <Stack.Screen name={SCREEN.FORGOT} component={ui.ForgotPassword} />
                            <Stack.Screen name={SCREEN.RESET_PASSWORD} component={ui.ResetPassword} />
                            <Stack.Screen name={SCREEN.ROLE_SELECTION} component={ui.RoleSelection} />
                            <Stack.Screen name={SCREEN.SIGNUP} component={ui.SignupScreen} />
                            <Stack.Screen name={SCREEN.CREATE_STATION} component={ui.CreateStation} />
                        </>
                        :
                        <>
                            <Stack.Screen name={SCREEN.VerifyPhone} component={ui.VerifyPhone} />
                            <Stack.Screen name={SCREEN.OTP} component={ui.OtpScreen} />
                            <Stack.Screen name={SCREEN.SUCCESS} component={ui.SuccessScreen} />
                        </>
                    :
                    <>
                        <Stack.Screen name={SCREEN.TAB} component={TabNavigation} />
                        <Stack.Screen name={SCREEN.ADD_BOOKING} component={ui.AddBooking} />
                        <Stack.Screen name={SCREEN.CHAT} component={ui.ChatScreen} />
                        <Stack.Screen name={SCREEN.STATION_DETAIL} component={ui.StationDetailScreen} />
                        <Stack.Screen name={SCREEN.NOTIFICATIONS} component={ui.NotificationScreen} />
                        <Stack.Screen name={SCREEN.HISTORY} component={ui.HistoryScreen} />
                    </>
            }
        </Stack.Navigator>
    )
}

export default RootNavigator
