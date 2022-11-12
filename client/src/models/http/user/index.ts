import { IResponse } from "../../../config";
import { generateWrongResponse } from "../../../funcs";
import { FetchWrap } from "../fetchWrap";
import { routes } from "../routes";

export class User {
  static async getUserData(): Promise<IResponse> {
    try {
      return await FetchWrap.get(`${routes.admin.getUserData}`)
    } catch (err) {
      console.error(err)
      return generateWrongResponse(err)
    }
  }
}