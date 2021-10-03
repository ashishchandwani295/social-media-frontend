export interface IComment {
    id: number
    body: string
    username: string
    createdAt: string
  }
  
export interface ILike {
    id: number
    username: string
    createdAt: string
  }

export interface IPost {
    body: string
    username: string
    comments: Array<IComment>
    commentsCount: number
    likes: Array<ILike>
    id: number
    likesCount: number
    createdAt: string
  }

export interface IRegister {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ILogin {
  username: string
  password: string
}

export interface IUser {
  id: number
  username: string
  token: string
  email: string
  createdAt: string
}

export interface IInitialState {
  userDetails: IUser | undefined
  login: (userDetails: IUser) => void
  logout: () => void,
  newPost: boolean,
  dispatchNewPost: () => void
}