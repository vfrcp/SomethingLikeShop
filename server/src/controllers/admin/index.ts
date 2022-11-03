import { Request, Response } from "express";
import { Db } from "../../db";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";

export class AdminController {
  static async isAdminExist(req: Request, res: Response<IResponse>) {
    try {
      res.send(await Db.Admin.isAdminExist())
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async register(req: Request<{}, {}, {password: string, email: string}>, res: Response<IResponse>) {
    try{
      res.send(await Db.Admin.register(req.body))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async login(req: Request<{}, {}, {password: string, email: string}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Admin.login(req.body))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async changePassword(req: Request<{}, {}, {oldPassword: string, newPassword: string}>, res: Response<IResponse>) {
    try{ 
      res.send(await Db.Admin.changePassword(req.body))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
}