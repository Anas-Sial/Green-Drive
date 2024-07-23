import { StyleSheet, Text, View } from 'react-native'
import React, { useState, memo } from 'react'
import moment from 'moment'
import { Pressable } from '../reusables'
import { isIOS } from '../../utils/Helpers'
import DateTimePicker from '@react-native-community/datetimepicker'
import { COLOR, hp, commonStyles, TEXT_STYLE } from '../../enums/StyleGuide'

const TimePicker = ({ onSelect, value }) => {
    const [visible, setVisible] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentTime = selectedDate || value

        if (!isIOS()) {
            setVisible(false)
        }
        onSelect(currentTime)

    }

    const formateTime = (time) => {
        const formatedTime = moment(time).format('h:mm A')
        return formatedTime
    }

    return (
        <View>
            <Pressable style={styles.timeButtonStyle} onPress={() => { setVisible(true) }}>
                <Text style={styles.timeButtonText}>{formateTime(value)}</Text>
            </Pressable>

            {visible &&
                <DateTimePicker
                    value={value}
                    mode={'time'}
                    display={isIOS() ? 'compact' : 'calender'}
                    is24Hour={true}
                    onChange={onChange}
                />
            }
        </View>
    )
}

export default memo(TimePicker)

const styles = StyleSheet.create({
    timeButtonStyle: {
        height: hp(6),
        width: '92%',
        alignSelf: 'center',
        backgroundColor: COLOR.fadeWhite,
        borderRadius: hp(1),
        borderWidth: 1,
        borderRadius: hp(1),
        paddingHorizontal: '5%',
        marginVertical: hp(0.2),
        justifyContent: 'center',
        borderColor: COLOR.gray_2,
        ...commonStyles.shadow_5,
    },
    timeButtonText: {
        ...TEXT_STYLE.semi_title,
        color: COLOR.black,
    },
})