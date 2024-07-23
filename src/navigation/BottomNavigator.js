import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ui from '../screens';
import { SCREEN } from '../enums/AppEnums';
import { hp, COLOR } from '../enums/StyleGuide';
import { BookingsActive, BookingsSVG, ExploreActive, ExploreIcon, SettingsActive, SettingsIcon, StationActive, StationIcon } from '../assets/svg';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: COLOR.white,
                height: hp(8),
            }
        }}>
            <Tab.Screen name={SCREEN.HOME} component={ui.HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? <ExploreActive /> : <ExploreIcon />}
                    </>
                )
            }} />

            <Tab.Screen name={SCREEN.MY_BOOKINGS} component={ui.MyBookings} options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? <BookingsActive /> : <BookingsSVG />}
                    </>
                )
            }} />

            <Tab.Screen name={SCREEN.FAVORITES} component={ui.FavoriteStations} options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? <StationActive /> : <StationIcon />}
                    </>
                )
            }} />

            <Tab.Screen name={SCREEN.SETTINGS} component={ui.SettingScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        {focused ? <SettingsActive /> : <SettingsIcon />}
                    </>

                )
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigation
