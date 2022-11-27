import {useChat} from './containers/hooks/useChat'
import { message } from 'antd'
import {useEffect} from "react";
import SignIn from './containers/SignIn'
import ChatRoom from './containers/ChatRoom'
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const App = () => {
    const {status, signedIn, me, setMe, setSignedIn} = useChat();
    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            type? message.success(content) : message.error(content)
        }
    }

    useEffect(() => {
        displayStatus(status)}, [status])

    return (
        <Wrapper> {signedIn? <ChatRoom/>:<SignIn/>}</Wrapper>
    )
}

export default App
