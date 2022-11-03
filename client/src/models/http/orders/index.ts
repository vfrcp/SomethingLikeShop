import { IResponse } from "../../../config";
import { generateWrongResponse } from "../../../funcs";
import { FetchWrap } from "../fetchWrap";
import { routes } from "../routes";

export class Orders {
  static async create(body: {buyerUsername: string, address: string, phoneNumber: string, goodsId: string[]}): Promise<IResponse> {
    try {
      return await FetchWrap.post(routes.orders.create, JSON.stringify(body))
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getByPage(page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.getByPage}/${page}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getUnconfirmedByPage(page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.getUnconfirmedByPage}/${page}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getConfirmedByPage(page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.getConfirmedByPage}/${page}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getUndoneByPage(page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.getUndoneByPage}/${page}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getDoneByPage(page: number): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.getDoneByPage}/${page}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async confirmOrderById(id: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.confirmById}/${id}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async doneById(id: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.doneById}/${id}`)
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async deleteById(id: string): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.orders.deleteById}/${id}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
}