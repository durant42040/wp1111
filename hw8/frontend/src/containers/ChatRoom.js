import { Input, Tag, message, Tabs } from 'antd'
import Title from '../components/Title'
import {useChat} from './hooks/useChat'
import {useState, useEffect, useRef} from "react";
import styled from 'styled-components';
import Message from '../components/Message'
import ChatModal from '../components/ChatModal'
import {CREATE_MESSAGE_MUTATION} from '../graphql';
import {useQuery, useMutation} from "@apollo/client";

const Wrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 445px;
    `;
const ChatBoxesWrapper = styled(Tabs)`
      width: 100%;
      height: 300px;
      background: #eeeeee52;
      border-radius: 10px;
      margin: 20px;
      padding: 20px;
      overflow: scroll;
    `;

const Footer = styled.div`
  height: 5px;
`;

const ChatRoom = () => {
    const msgFooter = useRef(null)
    const bodyRef = useRef(null)
    const {messages, me, startChat, displayStatus, friend, setFriend, setMessages} = useChat()
    const [body, setBody] = useState('')
    const [users, setUsers] = useState([])
    const [activeKey, setActiveKey] = useState(users.length === 0 ? '' : users[0].key);
    const [modal, setModal] = useState(false);
    const [render, setRender] = useState(false)
    const [sent, setSent] = useState(false)
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({behavior: 'smooth', block: "center"})
    }

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        users.forEach((user, i) => {
            if (user.key === targetKey) lastIndex = i - 1;
        });
        const newUsers = users.filter((user) => user.key !== targetKey);
        if (newUsers.length && newActiveKey === targetKey) {
            if (lastIndex >= 0 && lastIndex !== newUsers.length - 1) newActiveKey = newUsers[lastIndex + 1].key;
            else if (lastIndex === newUsers.length - 1) newActiveKey = newUsers[lastIndex].key;
            else newActiveKey = newUsers[0].key;
        }
        setUsers(newUsers);
        setActiveKey(newActiveKey);
    };


    const renderChat = () => {
        return (
            <>
                {messages.map(({sender, body}, i) => (<Message key={i} message={body} me={sender === me}/>))}
                <Footer ref={msgFooter}/>
            </>
        )
    }


    const createChatBox = (friend) => {
        const chat = renderChat();
        setUsers([...users, {label: friend, key: friend, children: chat}]);
        return friend;
    };

    useEffect(() => {
        scrollToBottom();
        console.log('message')
    }, [messages])

    useEffect(() => {
        if (users.length) {
            const chat = renderChat();
            let newusers = users
            newusers.find((e) => {
                return e.label === activeKey
            }).children = chat
            setUsers(newusers)
        }
    }, [messages])


    return (
        <Wrapper>
            <Title name={me}/>
            <ChatBoxesWrapper
                items={users}
                tabBarStyle={{height: '36px'}}
                type="editable-card"
                activeKey={activeKey}
                onChange={async (key) => {
                    setBody('');
                    setActiveKey(key);
                    setFriend(key);
                    startChat({variables: {name1: me, name2: key}});
                }}
                onEdit={(targetKey, action) => {
                    action == 'add' && setModal(true);
                    action == 'remove' && remove(targetKey)
                }}
            />
            <ChatModal
                open={modal}
                onCreate={async ({name}) => {
                    if (users.some(({key}) => key === name)) {
                        displayStatus({
                            type: false,
                            msg: name + "'s chat box is already open."
                        });
                        return;
                    }
                    await startChat({variables: {name1: me, name2: name}});
                    setActiveKey(createChatBox(name));
                    setFriend(name)
                    setModal(false);
                }}
                onCancel={() => {
                    setModal(false);
                }}
            />
            <Input.Search
                ref={bodyRef}
                enterButton="Send"
                placeholder="Type a message here..."
                value={body}
                onChange={(e) => {
                    setBody(e.target.value);
                }}
                onSearch={async (msg) => {
                    if (!msg) {
                        displayStatus({
                            type: false,
                            msg: 'Please enter a username and a message body.'
                        })
                        return;
                    }
                    if (!users.length) {
                        displayStatus({
                            type: false,
                            msg: 'Please add chatbox.'
                        })
                        return;
                    }
                    await sendMessage({variables: {name: me, to: activeKey, body}});
                    setMessages([...messages, {sender: me, body}])
                    setBody('');
                    setSent(true);
                }}
            ></Input.Search>
        </Wrapper>
    )
}

export default ChatRoom























