import { config, IResponse } from "../../../config";

export class FetchWrap {
  
  static async post(path: string, body: any, withImg: boolean = false): Promise<IResponse> {

    const authToken = localStorage.getItem("authorizationToken")
    const headers: HeadersInit = {}
    if(authToken) headers["Authorization"] = authToken
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
    const authToken = localStorage.getItem("key")
    const headers: HeadersInit = {
      "Content-Type": "application/json;charset=utf-8",
    }
    
    if(authToken) headers["Authorization"] = authToken
    const response = await fetch(`${config.server.link}${path}`, {
      headers
    })
    const authTokenFromHeader = response.headers.get("Authorization")
    if(authToken && authTokenFromHeader && authToken !== authTokenFromHeader) {
      localStorage.setItem("authorizationToken", authToken)
    }
    return await response.json()
  }
}