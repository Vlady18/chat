// @flow
import * as React from 'react';
import {createContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {useContext} from "react";
import {useContacts} from "./ContactsContext";
import {useState} from "react";
import {useSocket} from "./SocketContext";
import {useEffect} from "react";
import {useCallback} from "react";


const ConversationsContext = createContext()


export const useConversations = ()=>{
    return useContext(ConversationsContext)
}

const arrayEquality = (a, b)=>{
    if(a.length !== b.length) return false
    a.sort()
    b.sort()
    return a.every((el, i)=>{
        return el === b[i]
    })
}

export const ConversationsContextProvider = (props) => {

    const [conversations, setConverations] = useLocalStorage('conversations', []);

    const [selectedIdx, setSelectedIdx] = useState(0)

    const socket = useSocket()
    const {contacts} = useContacts()


    const addConversations = (recipients)=>{
        setConverations(prevState=>{
            return [...prevState, {recipients, messages: []}]
        })
    }



    const addMessageToConversations = useCallback( ({recipients, text, sender})=>{
        setConverations(prevConversations=>{
            let madeChange = false

            const newMessage = {sender, text}

            const newConverstions = prevConversations.map(conversation=>{
                if(arrayEquality(conversation.recipients, recipients)){
                    madeChange = true
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                } else{
                    return conversation
                }
            })

            if(madeChange){
                return newConverstions
            } else{
                return [
                    ...prevConversations,
                    {recipients, messages: [newMessage]}
                ]

            }
        })
    }, [setConverations])

    useEffect(()=>{
        if(socket == null) return

        socket.emit('receive-message', addMessageToConversations)

        return ()=>socket.off('receive-message')
    },[socket, addMessageToConversations])

    const sendMessage = (recipients, text)=>{
        socket.emit('send-message', {recipients, text})
        addMessageToConversations({recipients, text, sender: props.id})
    }

    const formattedConverstaion = conversations.map((conversation, index)=>{
        const recipients = conversation.recipients.map((recipient, idx)=>{
            const contact = contacts.find((contact)=>{
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            return {id: recipient, name}
        })
        const messages = conversation.messages.map((message, idx)=>{
            const contact = contacts.find((contact)=>{
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = props.id === message.sender
            return {...message, senderName: name, fromMe}
        })
        const selected = index === selectedIdx
        return {...conversation, recipients, index, selected, messages}
    })

    const value = {
        addConversations,
        conversations: formattedConverstaion,
        setSelectedIdx,
        selectedConversations: formattedConverstaion[selectedIdx],
        sendMessage

    }

    return (
        <ConversationsContext.Provider value={value}>
            {props.children}
        </ConversationsContext.Provider>
    );
};