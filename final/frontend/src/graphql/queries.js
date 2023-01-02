import { gql } from '@apollo/client';

export const GET_ARTICLES_QUERY = gql`
query getArticles {
    getArticles {
        id
        imageURL
        title
        description
        headline
    }
}
`;

export const GET_ARTICLE_QUERY = gql`
    query getArticle($id: String!) {
        getArticle(id: $id){
            writer
            imageURL
            time
            description
            content
            title
            userpic
            headline
            id
        }
    }
`;