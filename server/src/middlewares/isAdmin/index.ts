import { Request, Response, NextFunction} from "express";
import { config } from "../../config";
import { Tokens } from "../../jwt";

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // try{
  //   if(!req.headers.authorization) throw "Нет ключа доступа"
  //   if(req.headers.authorization !== config.admin.accessKey) throw "Ключ не верный"
  //   req.isAdmin = true
  // }catch (err) {
  //   console.log(config.admin.accessKey, req.headers.authorization)
  //   req.isAdmin = false
  // }finally {
  //   next()
  // }
  try {
    const tokenA = req.headers?.authorization
    const tokenR = req.cookies?.RefreshToken
    if(!tokenR || !tokenA) throw "Один или все токены отсутствуют" 
      const check = Tokens.check(tokenA.substring(7), tokenR)
      if(check.status === "normal" && check.data){
        req.isAdmin = check.data.username === "admin"
        req.authData = check.data
      }else if(check.status === "expired" && check.data) {
        const {uid, username} = check.data
        const newTokens = Tokens.create({uid, username})
        res.cookie("RefreshToken", newTokens.tokenR, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30
        })
        res.header("Authorization", "Bearer " + newTokens.tokenA)
        req.isAdmin = check.data.username === "admin"
        req.authData = check.data
      }else if(check.status === "fullExpiresOrMissing" || check.status === "invalid") throw "Invalid or expired"
  } catch (err) {
    req.isAdmin = false
  }finally {
    next()
  }
}