import { IConfig } from "./types";

interface IResponseWrong {
  status: "wrong",
  body: null,
  message: string
}
interface IResponseSuccess {
  status: "success",
  body: any,
  message: null
}

export type IResponse = IResponseSuccess | IResponseWrong 

export const config: IConfig = {
  server: {
    link: "http://localhost:5000"
  }
}