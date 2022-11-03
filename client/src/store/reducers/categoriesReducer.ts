import { ICategoriesAction, ICategoriesState } from "./types";

const defaultState: ICategoriesState = {
  categories: null,
  loading: false,
  error: null
}

const generateNewState = (action: ICategoriesAction) => {return {categories: action.payload, loading: action.loading, error: action.error}}

export const categoriesReducer = (state: ICategoriesState = defaultState, action: ICategoriesAction): ICategoriesState => {
  switch (action.type) {
    case "CATEGORIES_FETCH": return generateNewState(action)
    case "CATEGORIES_SUCCESS": return generateNewState(action)
    case "CATEGORIES_WRONG": return generateNewState(action)
    default: return state
  }
}