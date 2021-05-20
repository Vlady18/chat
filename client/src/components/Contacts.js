// @flow
import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useContacts} from "../context/ContactsContext";

export const Contacts = (props) => {
    const {contacts} = useContacts()

    return (
        <div>
            <List component="nav" aria-label="secondary mailbox folders">
                {contacts.map((el, i) => <ListItem button key={el.id}>
                            <ListItemText primary={el.name}/>
                        </ListItem>
                )}
            </List>
        </div>
    );
};