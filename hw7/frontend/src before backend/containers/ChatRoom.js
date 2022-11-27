import { Input, Tag, message, Tabs } from 'antd'
import Title from '../components/Title'
import {useChat} from './hooks/useChat'
import {useState, useEffect, useRef} from "react";
import styled from 'styled-components';
import Message from '../components/Message'
import ChatModal from '../components/ChatModal'

const Wrapper = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 500px;
      margin: auto;
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
  height: 20px;
`;

const ChatRoom = () => {
    const msgFooter = useRef(null)
    const bodyRef = useRef(null)
    const {status, messages, sendMessage, me} = useChat()

    const [body, setBody] = useState('')
    const [users, setUsers] = useState([])
    const [activeKey, setActiveKey] = useState(users.length === 0 ? '' : users[0].key);
    const [modal, setModal] = useState(false);

    const displayStatus = (s) => {
        if (s.msg) {
            const {type, msg} = s;
            const content = {
                content: msg, duration: 0.5
            }
            type ? message.success(content) : message.error(content)
        }
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "center" })
    }

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        users.forEach((user, i) => {
            if (user.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newUsers = users.filter((user) => user.key !== targetKey);
        if (newUsers.length && newActiveKey === targetKey) {
            if (lastIndex >= 0 && lastIndex !== newUsers.length - 1) {
                newActiveKey = newUsers[lastIndex + 1].key;
            } else if (lastIndex === newUsers.length - 1) newActiveKey = newUsers[lastIndex].key;
            else newActiveKey = newUsers[0].key;
        }
        setUsers(newUsers);
        setActiveKey(newActiveKey);
    };

    const renderChat = (chat) => {
        return (
            <>
                {chat.map(({name, body}, i) => (<Message key={i} message={body} me={name === me}/>))}
                <Footer ref={msgFooter}/>
            </>
        )
    }

    const extractChat = (friend) => {
        return renderChat(messages.filter(({name, body}) => ((name === friend) || (name === me))));
    }


    const createChatBox = (friend) => {
        if (users.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box is already open.");
        }
        const chat = extractChat(friend);
        setUsers([...users, {label: friend, key: friend, children: chat}]);
        return friend;
    };

    useEffect(() => {
        scrollToBottom();
    })

    useEffect(() => {
        if(users.length) {
            const chat = extractChat(activeKey);
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
                onChange={(key) => {
                    setActiveKey(key);
                }}
                onEdit={(targetKey, action) => {
                    action == 'add' && setModal(true);
                    action == 'remove' && remove(targetKey)
                }}
            />
            <ChatModal
                open={modal}
                onCreate={({name}) => {
                    setActiveKey(createChatBox(name));
                    extractChat(name);
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
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: false,
                            msg: 'Please enter a username and a message body.'
                        })
                        return;
                    }
                    sendMessage({name: me, body});
                    setBody('');
                }}
            ></Input.Search>
        </Wrapper>
    )
}

export default ChatRoom























