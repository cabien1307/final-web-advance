import { ACTIONS } from "../actions"

const user = JSON.parse(localStorage.getItem('firstLogin'))

const initialState = {
    user: user || null,
    isLoggedIn: user ? true : false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
            }
        case ACTIONS.LOGOUT:
            return {
                isLoggedIn: false
            }
        default:
            return state
    }
}

export default authReducer
