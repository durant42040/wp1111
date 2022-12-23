import { gql } from '@apollo/client';

const CHATBOX_QUERY = gql`
query chatbox($name1: String!, $name2: String!){
    chatbox(name1: $name1, name2: $name2){
      name
      messages {
         sender
         body
      }
    }  
}
`

export {CHATBOX_QUERY};