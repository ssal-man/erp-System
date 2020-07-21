import { UserActionType } from "./user.actiontypes";

export const setCurrentUser = user => {
    return(
    {
        type: UserActionType.SET_CURRENT_USER,
        payload: user
    })
}

export const removeUser = () => {
    return(
    {
        type: UserActionType.REMOVE_USER,
        payload: {}
    })
}