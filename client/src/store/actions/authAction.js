import { ACTIONS } from './index'


export const LoginSuccessfull = (user) => ({
    type: ACTIONS.LOGIN_SUCCESS,
    payload: user
})

export const LoginFailure = () => ({
    type: ACTIONS.LOGIN_FAILURE
})

export const Logout = () => ({
    type: ACTIONS.LOGOUT
})