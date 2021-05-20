import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useRef} from "react";
import {useContacts} from "../context/ContactsContext";
import {useConversations} from "../context/ConversationsContext";
import {makeStyles} from "@material-ui/core/styles";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useState} from "react";


const useStyles = makeStyles((theme) => ({
    formField: {
        width: '100%'
    }
}));


export const NewConversationsModal = ({handleClose}) => {
    const classes = useStyles()
    const idRef = useRef()
    const nameRef = useRef()

    const {addConversations} = useConversations()
    const {contacts} = useContacts()

    const [selectedContactsId, setSelectedContactsId] = useState([])


    const newConversationHandler = (e)=>{
        e.preventDefault()
        addConversations(selectedContactsId)
        handleClose()
    }

    const handleCheckboxChange = (contactId)=>{
        setSelectedContactsId((prevSelectedContactsId)=>{
            if(prevSelectedContactsId.includes(contactId)){
                return prevSelectedContactsId.filter((prevId, idx)=>{
                    return prevId !== contactId
                })
            } else{
                return [...prevSelectedContactsId, contactId]
            }
        })
    }


    return (
        <div>
            <form onSubmit={newConversationHandler}>
                <FormGroup>
                {
                    contacts.map((contact, i)=>{
                        return <FormControlLabel row key={contact.id}
                                          control={
                                              <Checkbox
                                                  checked={selectedContactsId.includes(contact.id)}
                                                  onChange={()=>handleCheckboxChange(contact.id)}
                                                  color="primary"
                                              />
                                          }
                                          label={contact.name}
                        />
                    })
                }
                </FormGroup>
                <Button style={{marginTop: '15px'}} type="submit" variant="contained" color="primary">
                    Create
                </Button>
            </form>
        </div>
    );
};