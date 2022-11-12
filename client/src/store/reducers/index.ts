import { combineReducers } from "redux";
import { categoriesReducer } from "./categoriesReducer";
import { goodsReducer } from "./goodsReducer";
import { ordersReducer } from "./ordersReducer";
import { userReducer } from "./userReducers";

export const rootReducer = combineReducers({
  goods: goodsReducer,
  categories: categoriesReducer,
  orders: ordersReducer,
  user: userReducer
})