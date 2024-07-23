import { IMAGES } from '../../assets/images'
import { SCREEN, USER_ROLE } from '../../enums/AppEnums'
import { COLOR } from '../../enums/StyleGuide'
import En from '../../locales/En'
import * as SVG from '../../assets/svg'

export const userRolesData = [
    { title: En.driver, role: USER_ROLE.DRIVER, instructions: En.chargeEv, image: IMAGES.driverIcon, activeColor: COLOR.darkBlue, route: SCREEN.SIGNUP },
    { title: En.host, role: USER_ROLE.OWNER, instructions: En.earnMoney, image: IMAGES.hostIcon, activeColor: COLOR.orange, route: SCREEN.CREATE_STATION },
]

export const mapData = [
    { latitude: 28.42881, longitude: 70.31213 },
    { latitude: 28.429731, longitude: 70.304039 },
    { latitude: 28.429882, longitude: 70.301159 },
];

export const stationData = [
    {
        id: '1',
        name: 'Testing Host Name 1',
        location: 'Rahim Yar Khan',
        dateTime: 'Monday 2, 2024 3:20 pm',
        rating: '4.5',
        totalReviews: 100,
        price: '$20.00',
    },
    {
        id: '2',
        name: 'Testing Host Name 2',
        location: 'Lahore',
        dateTime: 'Tuesday 3, 2024 4:30 pm',
        rating: '4.2',
        totalReviews: 120,
        price: '$25.00',
    },
    {
        id: '3',
        name: 'Testing Host Name 3',
        location: 'Rahim Yar Khan',
        dateTime: 'Monday 2, 2024 3:20 pm',
        rating: '4.5',
        totalReviews: 100,
        price: '$20.00',
    },
    {
        id: '4',
        name: 'Testing Host Name 4',
        location: 'Rahim Yar Khan',
        dateTime: 'Tuesday 3, 2024 4:30 pm',
        rating: '4.2',
        totalReviews: 120,
        price: '$25.00',
    },
];

export const settingsData = [
    { title: En.notifications, icon: SVG.NotificationIcon, route: SCREEN.NOTIFICATIONS },
    // { title: En.language, icon: SVG.GlobeIcon, },
    // { title: En.theme, icon: SVG.ColorBoard, },
    { title: En.history, icon: SVG.HistoryIcon, route: SCREEN.HISTORY },
    // { title: En.faq, icon: SVG.QuestionIcon, },
    { title: En.privacyPolicy, icon: SVG.TermsIcon, },
    { title: En.termsAndConditions, icon: SVG.TermsIcon, },
]


export const dummyChats = [
    { text: "Testing", timestamp: 1645743000000, sentBy: '2', },
    { text: "Testing", timestamp: 1645757100000, sentBy: '3', },
    { text: "Testing", timestamp: 1645743000000, sentBy: '2', },
]

export const localNotifications = [
    { image: IMAGES.userImage, text: 'Your booking has been confirmed.', },
]

export const durationsData = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '1 hr', value: 60 },
    { label: '1 hr 30 min', value: 90 },
    { label: '2 hr', value: 120 },
]