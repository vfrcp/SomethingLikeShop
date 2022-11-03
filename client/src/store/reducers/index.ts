import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { goodsReducer } from "./goodsReducer";
import { ordersReducer } from "./ordersReducer";

export const rootReducer = combineReducers({
  goods: goodsReducer,
  categories: categoriesReducer,
  orders: ordersReducer
})