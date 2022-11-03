import { IResponse } from "./types"

// генераторы ответов для отправки на клиент
export const generateWrongResponse = (err: any): IResponse => {return {status: "wrong", body: null, message: `${err}`}}