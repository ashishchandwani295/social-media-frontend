import { createContext, useEffect, useReducer } from 'react';
import jwtdecode from 'jwt-decode';
import { useRouter } from 'next/dist/client/router';
import nookies from 'nookies';

import { IInitialState, IUser } from '../interfaces';
import { AUTH_ACTIONS } from './actions/auth';
import { reducer } from './reducers';
import { verifyAuth } from '../utils/auth';
import { NEW_POST_ACTIONS } from './actions/post';

const initialState: IInitialState= {
    userDetails: verifyAuth() ? verifyAuth() : undefined,
    login: (userDetails: IUser) => {},
    logout: () => {},
    newPost: false,
    dispatchNewPost: () => {}
}

type AuthToken = {
    id: number
    email: string
    username: string
    exp: number
    iat: number
}

export const Context = createContext(initialState);

export const ContextProvider = ({ children }: any) => {

    const [ state, dispatch ] = useReducer(reducer, initialState)

    const router = useRouter();
    
    const { userDetails, newPost } = state

    useEffect(() => {
        if(typeof window !== "undefined") {
            (window as any).nookies = nookies;
        }
        
        if(localStorage.getItem("authToken")) {
            const token: string = localStorage.getItem("authToken");
            const decodedToken: AuthToken = jwtdecode(token);

            if(decodedToken.exp * 1000 < Date.now()) {
                logout();
                router.push('/login')
            }
        }
    }, [router])

    const login = (userDetails: IUser) => {
        dispatch({
            type: AUTH_ACTIONS.LOGIN,
            payload: userDetails
        })
    }

    const logout = () => {
        dispatch({
            type: AUTH_ACTIONS.LOGOUT
        })
    }

    const dispatchNewPost = () => {
        dispatch({
            type: NEW_POST_ACTIONS.NEW_POST
        })
    }

    return <Context.Provider value={{ userDetails, newPost, login, logout, dispatchNewPost }}>{children}</Context.Provider>
}