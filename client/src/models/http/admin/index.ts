import { config, IResponse } from "../../../config";
import { generateWrongResponse } from "../../../funcs";
import { FetchWrap } from "../fetchWrap";
import { routes } from "../routes";

export class Admin {
  static async isAdminExist(): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.admin.isAdminExist}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async isKeyValid(): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.admin.isKeyValid}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async login(data: {password: string, email: string}): Promise<IResponse> {
    try {
      const response = await FetchWrap.post(`${routes.admin.login}`, JSON.stringify(data))
      if(response.status === "wrong") throw response.message
      localStorage.setItem("key", response.body)
      return response
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async register(data: {password: string, email: string}): Promise<IResponse> {
    try {
      console.log(routes.admin.register)
      const response = await FetchWrap.post(`${routes.admin.register}`, JSON.stringify(data))
      if(response.status === "wrong") throw response.message
      return response
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  static async getUserData() {
    try {
      return await FetchWrap.get(`${routes.admin.getUserData}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
  // static async changePassword() {

  // }

}