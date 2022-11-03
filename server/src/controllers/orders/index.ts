import { Request, Response } from "express";
import { Db } from "../../db";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { responseAnswers } from "../responseAnswers";

export class OrdersController {
  static async getUnconfirmedByPage(req: Request<{page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.getUnconfirmedByPage(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getConfirmedByPage(req: Request<{page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.getConfirmedByPage(req.params))
    }catch (err) {
      generateWrongResponse(err)
    }
  }
  static async getUndoneByPage(req: Request<{page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.getUndoneByPage(req.params))
    }catch (err) {
      generateWrongResponse(err)
    }
  }
  static async getDoneByPage(req: Request<{page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.getDoneByPage(req.params))
    } catch (err) {
      generateWrongResponse(err)
    } 
  }
  static async create(req: Request<{}, {}, {
    buyerUsername: string,
    address: string,
    phoneNumber: string,
    goodsId: string
  }>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.create(req.body))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async confirm(req: Request<{id: string}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.confirm(req.params))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async done(req: Request<{id: string}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.done(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async deleteById(req: Request<{id: string}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Orders.deleteById(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
}