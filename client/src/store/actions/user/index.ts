import { Dispatch } from "react"
import { Http } from "../../../models/http"
import { IUserAction } from "../../reducers/types"

export const getUserData = () => {
  return async (dispatch: Dispatch<IUserAction>) => {
    try {
      dispatch({type: "USER_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Admin.getUserData()
      if(response.status !== "success") throw response.message
      dispatch({type: "USER_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "USER_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const loginUserAction = (payload: {password: string, email: string}) => {
  return async (dispatch: Dispatch<IUserAction>) => {
    try {
      dispatch({type: "USER_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Admin.login(payload)
      if(response.status !== "success") throw response.message
      dispatch({type: "USER_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "USER_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const registerUserAction = (payload: {password: string, email: string}) => {
  return async (dispatch: Dispatch<IUserAction>) => {
    try {
      dispatch({type: "USER_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Admin.register(payload)
      if(response.status !== "success") throw response.message
    } catch (err) {
      dispatch({type: "USER_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}