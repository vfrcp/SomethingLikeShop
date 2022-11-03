import { Request, Response } from "express";
import { Db } from "../../db";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { responseAnswers } from "../responseAnswers";

export class CategoriesController {
  static async getAllByPage(req: Request<{page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Categories.getAllByPage(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async get10BySearch(req: Request<{searchString: string}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Categories.get10BySearch(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  // static async getByName(req: Request, res: Response<IResponse>) {
  //   try {

  //   } catch (err) {
  //     res.send()
  //   }
  // }
  static async create(req: Request<{name: string}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Categories.create(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async deleteFromDb(req: Request<{name: string}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Categories.delete(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getBySearchAndPage(req: Request<{search: string, page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Categories.getBySearchAndPage(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
}