import * as React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useContacts} from "../context/ContactsContext";
import {useRef} from "react";

const useStyles = makeStyles((theme) => ({
    formField: {
        width: '100%'
    }
}));

export const NewContactsModal = ({handleClose}) => {

    const idRef = useRef()
    const nameRef = useRef()

    const {addNewContact} = useContacts()

    const newContactHandler = (e)=>{
        e.preventDefault()
        addNewContact(idRef.current.value, nameRef.current.value)
        handleClose()
    }
    const classes = useStyles();
    return (
        <div>
            <form onSubmit={newContactHandler}>
                <div>
                    <TextField inputRef={idRef} className={classes.formField} id="standard-basic1" label="ID"/>
                </div>
                <div>
                    <TextField inputRef={nameRef} className={classes.formField} id="standard-basic2" label="Name"/>
                </div>
                <Button style={{marginTop: '15px'}} type="submit" variant="contained" color="primary">
                    Добавить
                </Button>
            </form>
        </div>
    );
};