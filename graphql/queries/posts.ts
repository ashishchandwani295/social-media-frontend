import { gql } from "@apollo/client";

export const GET_POSTS = gql`
    query getPosts { 
            getPosts {
                    id
                    body
                    username
                    comments {
                    body
                    createdAt
                    }
                    likes {
                    username
                    }
                    likesCount
                    commentsCount
            }
        }
`

export const GET_POST = gql`
query Query($getPostId: ID!) {
  getPost(postId: $getPostId) {
    id
    body
    username
    createdAt
    comments {
      id
      body
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    likesCount
    commentsCount
  }
}
`;