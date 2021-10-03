import nookies from 'nookies';

import { AUTH_ACTIONS } from "../actions/auth";
import { NEW_POST_ACTIONS } from '../actions/post';

export const reducer = (state: any, action: any) => {
    switch(action.type) {
        case AUTH_ACTIONS.LOGIN:
            localStorage.setItem("authToken", action.payload.token)
            nookies.set(null, "authToken", action.payload.token, {path: '/'})
            return {...state, userDetails: action.payload}

        case AUTH_ACTIONS.LOGOUT:
            localStorage.removeItem("authToken")
            nookies.destroy(null, "authToken", {path: '/'})
            return {...state, userDetails: null}
        
        case NEW_POST_ACTIONS.NEW_POST: 
                    return {...state, newPost: !state.newPost}

        default: return state
    }
}