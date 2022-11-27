import {useState, useEffect, useContext, createContext} from "react";
import {message} from 'antd';

const client = new WebSocket('ws://localhost:4000')

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    sendMessage: () => {},
});

const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [me, setMe] = useState(savedMe || '')
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => { if (signedIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
    }, [me, signedIn]);

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            type? message.success(content) : message.error(content)
        }
    }

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "output": {
                setMessages([...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "init": {
                setMessages(payload);
                break;
            }
            default: break;
        }
    }

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const sendMessage = (m) => {
        sendData(["input", m]);
    }

    return (
        <ChatContext.Provider value={{displayStatus, me, setMe, signedIn, setSignedIn, status, messages, sendMessage}}
        {...props}/>
            )

}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };

