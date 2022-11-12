import { IUserAction, IUserState } from "./types";

const defaultState: IUserState = {
  user: null,
  loading: false,
  error: null
}
const generateNewState = (action: IUserAction) => {return {user: action.payload, loading: action.loading, error: action.error}}

export const userReducer = (state: IUserState = defaultState, action: IUserAction): IUserState => {
  switch (action.type) {
    case "USER_FETCH": return generateNewState(action)
    case "USER_SUCCESS": return generateNewState(action)
    case "USER_WRONG": return generateNewState(action)
    default: return state
  }
}