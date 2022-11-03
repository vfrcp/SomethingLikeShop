import { IGoodsAction, IGoodsState } from "./types";

const defaultState: IGoodsState = {
  goods: null,
  loading: false,
  error: null,
}
const generateNewState = (action: IGoodsAction) => {return {goods: action.payload, loading: action.loading, error: action.error}}

export const goodsReducer = (state: IGoodsState = defaultState, action: IGoodsAction): IGoodsState => {
  switch (action.type) {
    case "GOODS_FETCH": return generateNewState(action)
    case "GOODS_SUCCESS": return generateNewState(action)
    case "GOODS_WRONG": return generateNewState(action)
    default: return state
  }
}