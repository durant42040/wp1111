import { Tag } from 'antd'
import styled from 'styled-components';

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({me}) => (me ? 'row-reverse' : 'row')};
  margin: 8px 0px;
  & p:first-child{
    margin: 0 5px;
    position: relative;
    top: 10px;
  }
  & p:last-child{
    padding: 2px 5px;
    border-radius: 5px;
    background: #eee;
    color: gray;
    margin: auto 0;
  }
`;

const Message = ({message, me}) => {
    return (
    <StyledMessage me={me}>
        <p>{message}</p>
    </StyledMessage>
);
};

export default Message
