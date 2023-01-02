import { gql } from '@apollo/client';

export const CREATE_ARTICLE_MUTATION = gql`
mutation createArticle($writer: String!, $imageURL: String!, $description: String!, $time: String!, $content: String!, $title: String!, $headline: Boolean!, $userpic: String!, $id: String!) {
    createArticle(writer: $writer, imageURL: $imageURL, description: $description, time: $time, content: $content, title: $title, headline: $headline, userpic: $userpic, id: $id) {
        writer
        imageURL
        time
        description
        content
        title
        userpic
        id
    }
}
`;

export const DELETE_ARTICLE_MUTATION = gql`
    mutation deleteArticle($id: String!) {
        deleteArticle(id: $id)
    }
`;

