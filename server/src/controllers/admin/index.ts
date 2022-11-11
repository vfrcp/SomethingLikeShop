import { Request, Response } from "express";
import { config } from "../../config";
import { Db } from "../../db";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { responseAnswers } from "../responseAnswers";

export class AdminController {
  static async isAdminExist(req: Request, res: Response<IResponse>) {
    try {
      res.send(await Db.Admin.isAdminExist())
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async isKeyValid(req: Request<{}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.withoutKey
      res.send({status: "success", body: req.isAdmin, message: null})
    } catch (err) {
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