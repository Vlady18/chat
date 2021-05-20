// @flow
import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import makeStyles from "@material-ui/core/styles/makeStyles";
import {useState} from "react";
import {useConversations} from "../context/ConversationsContext";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    formWrap: {
        display: 'flex',
        flexDirection: 'row',
    },
    fromMe: {
        alignSelf: 'flex-end',
    },
    myChip: {
        minHeight: '32px',
        marginTop: '5px'
    }

}));


export const OpenConversations = (props) => {

    const [messageText, setMessageText] = useState('')
    const {selectedConversations, sendMessage} = useConversations()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(messageText.trim()){
            sendMessage(selectedConversations.recipients.map(el=>el.id), messageText)
            setMessageText('')
        }
    }



    const classes = useStyles();


    return (
        <div className="dashboard-wrapper">
            <div className="chat-list">
                {
                    selectedConversations.messages.map((el, i)=>{
                        return el.fromMe
                            ? <Chip color="primary" className={`${classes.fromMe} ${classes.myChip}`} label={el.text} />
                            : <Chip className={`${classes.myChip}`} label={el.text} />
                })
                }

            </div>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth className={classes.formWrap}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        rowsMax={2}
                        multiline
                        fullWidth
                        value={messageText}
                        onChange={(e)=>setMessageText(e.target.value)}
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Send
                    </Button>
                </FormControl>
            </form>
        </div>
    );
};