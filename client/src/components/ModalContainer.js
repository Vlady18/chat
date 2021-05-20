// @flow
import * as React from 'react';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from '@material-ui/core/styles';
import {NewConversationsModal} from "./NewConversationsModal";
import {NewContactsModal} from "./NewContactsModal";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
export function ModalContainer(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            {/*<p id="simple-modal-description">*/}
            {/*    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
            {/*</p>*/}
            {props.conversationsOpen ? <NewConversationsModal {...props} /> : <NewContactsModal {...props} />}

        </div>
    );
    return (
        <Modal
            open={props.openModal}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    );
};