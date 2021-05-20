import './App.sass'
import {Login} from "./components/Login";
import useLocalStorage from "./hooks/useLocalStorage";
import {Dashboard} from "./components/Dashboard";
import {ContactsContextProvider} from "./context/ContactsContext";
import {ConversationsContextProvider} from "./context/ConversationsContext";
import {SocketProvider} from "./context/SocketContext";

function App() {
    const [id, setId] = useLocalStorage()
    const dashBoard = (
        <SocketProvider id={id}>
            <ContactsContextProvider>
                <ConversationsContextProvider id={id}>
                    <Dashboard id={id}/>
                </ConversationsContextProvider>
            </ContactsContextProvider>
        </SocketProvider>
    )

    return (
        <div className="App">
            {id ? dashBoard : <Login onIdSubmit={setId}/>}
        </div>
    );
}

export default App;
