import { Dispatch } from "redux"
import { Http } from "../../../models/http"
import { IOrdersAction } from "../../reducers/types"

export const createOrderAction = (order: {buyerUsername: string, address: string, phoneNumber: string, goodsId: string[]}) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.create(order)
      if(response.status === "wrong") throw response.message
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getOrdersByPageAction = (page: number) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.getByPage(page)
      if(response.status === "wrong") throw response.message
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getUnconfirmedOrdersByPageAction = (page: number) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.getUnconfirmedByPage(page)
      if(response.status === "wrong") throw response.message
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getConfirmedOrdersByPageAction = (page: number) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.getConfirmedByPage(page)
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getUndoneOrdersByPageAction = (page: number) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.getUndoneByPage(page)
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getDoneOrdersByPageAction = (page: number) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.getDoneByPage(page)
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const confirmOrderByIdAction = (id: string) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.confirmOrderById(id)
      if(response.status === "wrong") throw response.message
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const doneOrderByIdAction = (id: string) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.doneById(id)
      if(response.status === "wrong") throw response.message
      dispatch({type: "ORDERS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const deleteOrderbyIdAction = (id: string) => {
  return async (dispatch: Dispatch<IOrdersAction>) => {
    try {
      dispatch({type: "ORDERS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Orders.deleteById(id)
    } catch (err) {
      dispatch({type: "ORDERS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}