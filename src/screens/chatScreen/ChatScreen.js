import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyles, hp } from '../../enums/StyleGuide'
import { Header, Input, MessageView } from '../../components'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { dummyChats } from '../../data/local'
import En from '../../locales/En'

const ChatScreen = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState(dummyChats)

    const addNewMessage = () => {
        if (text) {
            const formattedMessage = {
                text,
                sentBy: '1',
                timestamp: Date.now(),
            }

            setMessages(prev => [...prev, formattedMessage])
            setText('')
        }
    }

    return (
        <View style={commonStyles.mainContainer}>
            <Header title={'Test Host'} />

            <KeyboardAwareFlatList
                bounces={false}
                data={messages}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <MessageView item={item} />}
            />

            <Input
                value={text}
                onChange={setText}
                style={styles.inputContainer}
                onSubmitPress={addNewMessage}
                textStyle={styles.inputStyle}
                placeholder={En.messagePlaceholder}
            />

        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    inputContainer: {
        height: hp(6),
        borderRadius: hp(5),
        elevation: 0,
    },
    inputStyle: {
        marginBottom: -3,
    },
})