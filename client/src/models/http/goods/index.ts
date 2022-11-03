import { config, IResponse } from "../../../config";
import { generateWrongResponse } from "../../../funcs";
import { FetchWrap } from "../fetchWrap";
import { routes } from "../routes";

export class Goods {
  static async getByPage(page: number): Promise<IResponse> {
    try { 
      return await FetchWrap.get(`${routes.goods.getByPage}/${page}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async editById(id: string ,formData: FormData): Promise<IResponse> {
    try {
      return await FetchWrap.post(`${routes.goods.editById}/${id}`, formData, true)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getByPageAndCategory({category, page}: {category: string, page: number}): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.goods.getByPageAndCategory}/${category}/${page}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async create(data: FormData): Promise<IResponse> {
    try {
      return await FetchWrap.post(routes.goods.create, data, true)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async delete(id: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.goods.deleteById}/${id}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getById(id: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.goods.getById}/${id}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getByIds(ids: string[]): Promise<IResponse> {
    try {
      return await FetchWrap.post(`${routes.goods.getByIds}`, JSON.stringify({ids}))
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getBySearchAndCategoryAndPage(search: string, category: string, page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.goods.getBySearchAndCategoryAndPage}/${category}/${search}/${page}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getBySearchAndPage(search: string, page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.goods.getBySearchAndPage}/${search}/${page}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
}