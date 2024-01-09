import { View, Text, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import GlobalApi from '../Services/GlobalApi';
import { FontAwesome } from '@expo/vector-icons';

export default function ChatScreen() {
    const param = useRoute().params;
    const [messages, setMessages] = useState([]);
    const [selectedChatFace, setSelectedChatFace] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelectedChatFace(param.selectedFace);
        console.log(param.selectedFace) 
        setMessages([
            {
                _id: 1,
                text: 'Hello, I am '+ param.selectedFace.name+', How Can I help you?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: param.selectedFace.name,
                    avatar: param.selectedFace.image,
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        setLoading(true)
        if(messages[0].text){
            getBardResponse(messages[0].text);
        }
    }, [])

    const getBardResponse = (msg) => {
        GlobalApi.getBardApi(msg).then(resp=>{
            console.log(resp);
            if(resp.data.resp[1].content){
                const chatAPIResp = {
                    _id: Math.random()*(9999999 - 1),
                    text: resp.data.resp[1].content,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: param.selectedFace.name,
                        avatar: param.selectedFace.image
                    }
                }
                setMessages(previousMessages=> GiftedChat.append(previousMessages, chatAPIResp))
                setLoading(false)
            }
            else{
                setLoading(false)
                const chatAPIResp = {
                    _id: Math.random()*(9999999 - 1),
                    text: 'Sorry, I can not help with it',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: param.selectedFace.name,
                        avatar: param.selectedFace.image
                    }
                }
                setMessages(previousMessages=> GiftedChat.append(previousMessages, chatAPIResp))
            }
        })
    }

    const renderBubble =(props)=> {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#671ddf',
               
              },left:{
               
              }
             
            }}
            textStyle={{
                right:{
                    // fontSize:20,
                    padding:2
                },
                left: {
                  color: '#671ddf',
                  // fontSize:20,
                  padding:2
                }
              }}
          />
        )
      }

    const  renderInputToolbar =(props)=> {
        //Add the extra styles via containerStyle
       return <InputToolbar {...props} 
       containerStyle={{
       padding:3,
      
        backgroundColor:'#671ddf',
        color:'#fff',
        }} 
        
        textInputStyle={{ color: "#fff" }}
         />
     }

   const  renderSend=(props)=> {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
                   
                </View>
            </Send>
        );
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', marginTop:25}}>
            <GiftedChat
                scrollToBottom={true}
                messages={messages}
                isTyping={loading}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar} 
                renderSend={renderSend}
            />
        </SafeAreaView>
    )
}