import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import {useState} from "react";
import {useRef} from "react";
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        container:{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            '& form' : {
                width: '100%',
                '& div':{
                    width: '100%',
                    marginBottom: '5px',
                    '& button:first-child': {
                        marginRight: '10px'
                    }
                }
            },
        },
        flex: {
            display: 'flex',
        }
    }),
);

export function Login({onIdSubmit}) {
    const idRef = useRef()
    const classes = useStyles();
    const submitHandler = (e)=>{
        e.preventDefault()
        onIdSubmit(idRef.current.value)
        idRef.current.value = ''

    }
    const createNewIdHandler = ()=>{
        onIdSubmit(uuidv4())
        idRef.current.value = ''
    }
    return (
        <div>
            <Container maxWidth="sm" className={classes.container}>
                <form className={classes.form} onSubmit={submitHandler}>
                    <TextField inputRef={idRef}  id="standard-basic" label="Standard" />
                    <div className={classes.flex}>
                        <Button type="submit" variant="contained">Login</Button>
                        <Button onClick={createNewIdHandler} variant="contained" color="primary">Create New Id</Button>
                    </div>
                </form>
            </Container>
        </div>
    );
};