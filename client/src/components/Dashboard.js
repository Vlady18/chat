import * as React from 'react';
import {Sidebar} from "./Sidebar";
import {useConversations} from "../context/ConversationsContext";
import {OpenConversations} from "./OpenConversations";
export const Dashboard = (props) => {
    const {selectedConversations} = useConversations()
    return (
        <div className="chat-wrapper">
            <Sidebar {...props} />
            {selectedConversations && <OpenConversations/>}
        </div>
    );
};