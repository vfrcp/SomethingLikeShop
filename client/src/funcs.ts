import { IResponse } from "./config"

export const generateWrongResponse = (err: any): IResponse => {return {status: "wrong", body: null, message: `${err}`}}