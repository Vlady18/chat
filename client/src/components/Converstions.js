// @flow
import * as React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useContacts} from "../context/ContactsContext";
import {useConversations} from "../context/ConversationsContext";

export const Conversations = (props) => {
    const {conversations, setSelectedIdx} = useConversations()
    return (
        <div>
            <List component="nav" aria-label="secondary mailbox folders">
                {conversations.map((el, i) => <ListItem button key={i} selected={el.selected} onClick={()=>setSelectedIdx(i)}>
                        <ListItemText primary={el.recipients.map((r)=>r.name).join(', ')}/>
                    </ListItem>
                )}
            </List>
        </div>
    );
};