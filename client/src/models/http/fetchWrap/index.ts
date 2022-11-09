import { config, IResponse } from "../../../config";

export class FetchWrap {
  
  static async post(path: string, body: any, withImg: boolean = false): Promise<IResponse> {

    const token = localStorage.getItem("key")
    const headers: HeadersInit = {}
    if(token) headers["Authorization"] = token
    if(!withImg) headers["Content-Type"] = "application/json;charset=utf-8"
    const response = await fetch(`${config.server.link}${path}`, {
      method: "POST",
      headers,
      body,
    })
    return await response.json()
  }
  static async get(path: string): Promise<IResponse> {
    console.log(`${config.server.link}${path}`)
    const token = localStorage.getItem("key")
    const headers: HeadersInit = {
      "Content-Type": "application/json;charset=utf-8",
    }
    if(token) headers["Authorization"] = token
    const response = await fetch(`${config.server.link}${path}`, {
      headers
    })
    return await response.json()
  }
}