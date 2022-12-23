import { gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql`
subscription message($from: String!, $to: String!){
    message(from: $from, to: $to){
       sender
       body
    }
   }
`

export {MESSAGE_SUBSCRIPTION}
