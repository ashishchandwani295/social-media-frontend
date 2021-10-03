import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation RegisterMutation($registerInput: RegisterInput,) {
  register(registerInput: $registerInput) {
    id,
    username,
    token,
    email,
    createdAt
  }
}
`

export const LOGIN_USER = gql`
mutation LoginMutation($loginInput: LoginInput) {
  login(loginInput: $loginInput) {
    id
    username
    token
    email
    createdAt
  }
}
`