import { Dispatch } from "react"
import { Http } from "../../../models/http"
import { IGoodsAction } from "../../reducers/types"

export const getGoodsByPageAction = (page: number) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.getByPage(page)
      if(response.status === "wrong") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getGoodsByPageAndCategoryAction = (payload: {category: string, page: number}) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.getByPageAndCategory(payload)
      if(response.status === "wrong") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const deleteGoodAction = (id: string) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.delete(id) 
      if(response.status === "wrong") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getGoodByIdAction = (id: string) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.getById(id)
      if(response.status === "wrong") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getGoodsByIdsAction = (ids: string[]) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.getByIds(ids)
      if(response.status === "wrong") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getGoodsBySearch = (search: string, page: number) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.getBySearchAndPage(search, page)
      if(response.status === "wrong") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getGoodsBySearchAndCategoryAction = (search: string, category: string, page: number) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.getBySearchAndCategoryAndPage(search, category, page)
      if(response.status === "wrong") throw response.message 
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const editGoodByIdAction = (id: string, formData: FormData) => {
  return async (dispatch: Dispatch<IGoodsAction>) => {
    try {
      dispatch({type: "GOODS_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Goods.editById(id, formData)
      if(response.status !== "success") throw response.message
      dispatch({type: "GOODS_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "GOODS_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}