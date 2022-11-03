import { IOrdersAction, IOrdersState } from "./types";

const defaultState: IOrdersState = {
  orders: null,
  loading: false,
  error: null
}

const generateNewState = (action: IOrdersAction) => {return {orders: action.payload, loading: action.loading, error: action.error}}

export const ordersReducer = (state: IOrdersState = defaultState, action: IOrdersAction): IOrdersState => {
  switch (action.type) {
    case "ORDERS_FETCH": return generateNewState(action)
    case "ORDERS_SUCCESS": return generateNewState(action)
    case "ORDERS_WRONG": return generateNewState(action)
    default: return state
  }
}