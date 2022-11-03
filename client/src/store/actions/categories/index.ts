import { Dispatch } from "redux";
import { Http } from "../../../models/http";
import { ICategoriesAction } from "../../reducers/types";

export const getCategoriesByPageAction = (page: number) => {
  return async (dispatch: Dispatch<ICategoriesAction>) => {
    try {
      dispatch({type: "CATEGORIES_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Categories.getByPage(page)
      if(response.status === "wrong") throw response.message
      dispatch({type: "CATEGORIES_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "CATEGORIES_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const get10CategoriesBySearchAction = (searchString: string) => {
  return async (dispatch: Dispatch<ICategoriesAction>) => {
    try {
      dispatch({type: "CATEGORIES_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Categories.get10BySearch(searchString)
      if(response.status === "wrong") throw response.message
      dispatch({type: "CATEGORIES_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "CATEGORIES_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const deleteCategoryByNameAction = (name: string) => {
  return async (dispatch: Dispatch<ICategoriesAction>) => {
    try {
      dispatch({type: "CATEGORIES_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Categories.deleteByName(name)
      if(response.status === "wrong") throw response.message
      dispatch({type: "CATEGORIES_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "CATEGORIES_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const createCategoryAction = (name: string) => {
  return async (dispatch: Dispatch<ICategoriesAction>) => {
    try {
      dispatch({type: "CATEGORIES_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Categories.create(name)
      if(response.status === "wrong") throw response.message
      dispatch({type: "CATEGORIES_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "CATEGORIES_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}
export const getCategoriesBySearchAndPageAction = (search: string, page: number) => {
  return async (dispatch: Dispatch<ICategoriesAction>) => {
    try {
      dispatch({type: "CATEGORIES_FETCH", payload: null, loading: true, error: null})
      const response = await Http.Categories.getBySearchAndPage(search, page)
      if(response.status === "wrong") throw response.message
      dispatch({type: "CATEGORIES_SUCCESS", payload: response.body, loading: false, error: null})
    } catch (err) {
      dispatch({type: "CATEGORIES_WRONG", payload: null, loading: false, error: `${err}`})
    }
  }
}