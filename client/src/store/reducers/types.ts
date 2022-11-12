import { rootReducer } from "."
import { ICategory, IGood, IOrder } from "../../types"

export type IStore = ReturnType<typeof rootReducer>

export interface IGoodsState {
  goods: IGood[] | null
  loading: boolean,
  error: string | null
}

interface IGoodsActionSuccess {
  type: "GOODS_SUCCESS"
  payload: IGood[]
  loading: false
  error: null
}
interface IGoodsActionWrong {
  type: "GOODS_WRONG"
  payload: null
  loading: false
  error: string
}
interface IGoodsActionFetch {
  type: "GOODS_FETCH"
  payload: null
  loading: true
  error: null
}
export interface ICategoriesState {
  categories: ICategory[] | null
  loading: boolean
  error: string | null
}
export interface ICategoriesActionSuccess {
  type: "CATEGORIES_SUCCESS"
  loading: false
  payload: ICategory[]
  error: null
}
export interface ICategoriesActionWrong {
  type: "CATEGORIES_WRONG"
  loading: false
  payload: null
  error: string
}
export interface ICategoriesActionFetch {
  type: "CATEGORIES_FETCH"
  loading: true
  payload: null
  error: null
}

export interface IOrdersState {
  orders: IOrder[] | null
  loading: boolean
  error: null | string
}
export interface IOrdersActionSuccess {
  type: "ORDERS_SUCCESS"
  loading: false
  payload: IOrder[]
  error: null
}
export interface IOrdersActionWrong {
  type: "ORDERS_WRONG"
  loading: false
  payload: null
  error: string
}
export interface IOrdersActionFetch {
  type: "ORDERS_FETCH"
  loading: true
  payload: null
  error: null
}

export interface IUserState {
  user: {
    username: string
    isAdmin: boolean
  } | null
  loading: boolean
  error: string | null
}
export interface IUserActionSuccess {
  type: "USER_SUCCESS"
  loading: false
  //Тут пока только один, а именно admin. Если в будущем буду улучшать, будут еще и другие
  payload: {username: string, isAdmin: boolean}
  error: null
}
export interface IUserActionWrong {
  type: "USER_WRONG"
  loading: false
  payload: null
  error: string
}
export interface IUserActionFetch {
  type: "USER_FETCH"
  loading: true
  payload: null
  error: null
}

export type ICategoriesAction = ICategoriesActionSuccess | ICategoriesActionWrong | ICategoriesActionFetch
export type IGoodsAction = IGoodsActionSuccess | IGoodsActionWrong | IGoodsActionFetch 
export type IOrdersAction = IOrdersActionSuccess | IOrdersActionWrong | IOrdersActionFetch
export type IUserAction = IUserActionSuccess | IUserActionWrong | IUserActionFetch