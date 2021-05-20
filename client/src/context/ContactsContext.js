import React, {useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = React.createContext()

export const useContacts = ()=>{
    return useContext(ContactsContext)
}


export const ContactsContextProvider = (props)=>{
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    const addNewContact = (id, name)=>{
        setContacts(prevState => {
            return [...prevState, {id, name}]
        })
    }

    return <ContactsContext.Provider value={{contacts, addNewContact}}>
        {props.children}
    </ContactsContext.Provider>
}