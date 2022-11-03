import { IResponse } from "../../../config";
import { generateWrongResponse } from "../../../funcs";
import { FetchWrap } from "../fetchWrap";
import { routes } from "../routes";

export class Categories {
  static async getByPage(page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.categories.getByPage}/${page}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async get10BySearch(searchString: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.categories.get10BySearch}/${searchString}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async deleteByName(name: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.categories.deleteByName}/${name}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async create(name: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.categories.create}/${name}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getBySearchAndPage(search: string, page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.categories.getBySearchAndPage}/${search}/${page}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
}