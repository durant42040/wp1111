import {useState, useEffect, useContext, createContext} from "react";
import {message} from 'antd';
import {useQuery, useMutation, useSubscription} from "@apollo/client";
import {CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, MESSAGE_SUBSCRIPTION} from '../../graphql';


const ChatContext = createContext({
    status: {},
    me: "",
    startChat: () => {},
    signedIn: false,
    messages: [],
});

const ChatProvider = (props) => {
    const LOCALSTORAGE_KEY = "save-me";
    const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
    const [me, setMe] = useState(savedMe || '')
    const [friend, setFriend] = useState('')
    const [status, setStatus] = useState({});
    const [sent, setSent] = useState(false)
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);
    const {data, loading, refetch} = useQuery(CHATBOX_QUERY, {variables: {name1: friend, name2: me}})

    refetch({name1: friend, name2: me})

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    useEffect(() => {
        if (data) setMessages(data.chatbox.messages)
    }, [data])

    useEffect(() => {
        setSent(!sent)
    }, [messages])

    useSubscription(MESSAGE_SUBSCRIPTION, {variables: {from: friend, to: me}})

    const displayStatus = (s) => {
        if (s.msg) {
            const {type, msg} = s;
            const content = {
                content: msg, duration: 0.5
            }
            type ? message.success(content) : message.error(content)
        }
    }

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION)


    return (
        <ChatContext.Provider value={{
            displayStatus,
            me,
            setMe,
            signedIn,
            setSignedIn,
            status,
            messages,
            startChat,
            friend,
            setFriend,
            setMessages
        }}
                              {...props}/>
    )

}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };

