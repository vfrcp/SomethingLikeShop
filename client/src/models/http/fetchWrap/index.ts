import { config, IResponse } from "../../../config";

export class FetchWrap {
  
  static async post(path: string, body: any, withImg: boolean = false): Promise<IResponse> {

    const authToken = localStorage.getItem("tokenA")
    const headers: HeadersInit = {}
    if(authToken) headers["Authorization"] = authToken
    if(!withImg) headers["Content-Type"] = "application/json;charset=utf-8"
    const response = await fetch(`${config.server.link}${path}`, {
      method: "POST",
      credentials: "include",
      headers,
      body,
    })
    const newTokenAFromHeader = response.headers.get("Authorization")
    console.log(Object.fromEntries(response.headers))
    console.log(newTokenAFromHeader)
    if(newTokenAFromHeader) localStorage.setItem("tokenA", newTokenAFromHeader)
    return await response.json()
  }
  static async get(path: string): Promise<IResponse> {
    console.log(`${config.server.link}${path}`)
    const authToken = localStorage.getItem("tokenA")
    const headers: HeadersInit = {
      "Content-Type": "application/json;charset=utf-8",
    }
    
    if(authToken) headers["Authorization"] = authToken
    const response = await fetch(`${config.server.link}${path}`, {
      headers,
      credentials: "include"
    })
    const newTokenAFromHeader = response.headers.get("Authorization")
    console.log(newTokenAFromHeader)
    if(newTokenAFromHeader) localStorage.setItem("tokenA", newTokenAFromHeader)
    return await response.json()
  }
}