import { Request, Response, NextFunction} from "express";
import { config } from "../../config";

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try{
    if(!req.headers.authorization) throw "Нет ключа доступа"
    if(req.headers.authorization !== config.admin.accessKey) throw "Ключ не верный"
    req.isAdmin = true
  }catch (err) {
    console.log(config.admin.accessKey, req.headers.authorization)
    req.isAdmin = false
  }finally {
    next()
  }
}