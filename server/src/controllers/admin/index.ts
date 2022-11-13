import { Request, Response } from "express";
import { config } from "../../config";
import { Db } from "../../db";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { responseAnswers } from "../responseAnswers";
import { Tokens } from "../../jwt";
import { v4 as createId } from "uuid";

export class AdminController {
  static async isAdminExist(req: Request, res: Response<IResponse>) {
    try {
      res.send(await Db.Admin.isAdminExist())
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getUserData(req: Request<{}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      if(!req.authData) throw responseAnswers.withoutAuthData
      res.send({status: "success", body: req.authData, message: null})
    } catch (err) {
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
      const dbAnswer = await Db.Admin.register(req.body)
      if(dbAnswer.status !== "success") throw dbAnswer.message
      const uid = createId()
      const tokens = Tokens.create({uid, username: "admin"})
      res.setHeader("Authorization", `Bearer ${tokens.tokenA}`)
                                                                        //30 days
      res.cookie("RefreshToken", tokens.tokenR, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30})
      res.send(dbAnswer)
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async login(req: Request<{}, {}, {password: string, email: string}>, res: Response<IResponse>) {
    try {
      const dbResponse = await Db.Admin.login(req.body)
      if(dbResponse.status !== "success") throw dbResponse.message
      const uid = createId()
      //Так так авторизация сейчас есть только у админа. Юзернейм всегда admin
      const tokens = Tokens.create({uid, username: "admin"})
      res.setHeader("Authorization", `Bearer ${tokens.tokenA}`)
                                                                        //30 days
      res.cookie("RefreshToken", tokens.tokenR, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30})
      res.send(dbResponse)
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