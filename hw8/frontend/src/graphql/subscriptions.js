import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
subscription subscribeToMessage($from: String!, $to: String!) {
      message(from: $from, to: $to) {
        sender
        body 
        }
    }
`;