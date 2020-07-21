import { UserActionType } from "./user.actiontypes";

export const setCurrentUser = user => {
    return(
    {
        type: UserActionType.SET_CURRENT_USER,
        payload: user
    })
}