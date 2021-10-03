import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation CreatePostMutation($createPostBody: String!) {
  createPost(body: $createPostBody) {
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

export const LIKE_UNLIKE_POST = gql`
mutation LikeUnlikePostMutation($PostId: ID!) {
  likeUnlikePost(postId: $PostId) {
    id
    body
    likes {
      username
    }
    username
    createdAt
    comments {
      id
      body
      username
      createdAt
    }
    likesCount
    commentsCount
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePostMutation($deletePostId: ID!) {
  deletePost(postId: $deletePostId)
}
`;

export const DELETE_COMMENT = gql`
mutation DeleteCommentMutation($postId: ID!, $deleteCommentId: ID!) {
  deleteComment(postId: $postId, commentId: $deleteCommentId) {
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

export const CREATE_COMMENT = gql`
mutation CreateCommentMutation($commentPostId: ID!, $commentBody: String!) {
  createComment(postId: $commentPostId, body: $commentBody) {
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