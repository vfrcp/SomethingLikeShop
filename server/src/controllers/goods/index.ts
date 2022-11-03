import { Request, Response } from "express";
import path from "path";
import { Db } from "../../db";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { responseAnswers } from "../responseAnswers";

export class GoodsController {
  static async getByPage(req: Request<{page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Goods.getByPage(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getByPageAndCategory(req: Request<{page: number, category: string}, {}, {}>, res: Response<IResponse>) {
    try {
      console.log(req.params)
      res.send(await Db.Goods.getByPageAndCategory(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getById(req: Request<{id: string}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Goods.getById(req.params))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getByIds(req: Request<{}, {}, {ids: string[]}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Goods.getByIds(req.body))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async create(req: Request<{}, {}, {name: string, price: string, description: string, category: string}>, res: Response<IResponse>) {
    try {
      console.log(req.file)
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      if(!req.files || !Array.isArray(req.files)) throw responseAnswers.withoutImages
      const imagesPaths = req.files.map(file => path.join("images", "goods", file.filename))
      res.send(await Db.Goods.create({imagesPaths, ...req.body}))
    }catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async deleteById(req: Request<{id: string}, {}, {}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      res.send(await Db.Goods.delete(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async edit(req: Request<{id: string}, {}, {name: string, price: string, description: string, category: string, rawImagesString: string}>, res: Response<IResponse>) {
    try {
      if(!req.isAdmin) throw responseAnswers.onlyAdmin
      const rawImages = JSON.parse(req.body.rawImagesString) as string[]
      if(req.files && Array.isArray(req.files) && rawImages) {
        req.files.map(file => {
          if(rawImages.includes(file.originalname)) {
            rawImages[rawImages.indexOf(file.originalname)] = path.join("images", "goods", file.filename)
          }
        })
      }
      console.log(rawImages)
      res.send(await Db.Goods.edit({id: req.params.id, newGoodData: req.body, imagesPaths: rawImages}))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async get10ByLargestNumberOfViews(req: Request, res: Response<IResponse>) {
    try {
      res.send(await Db.Goods.get10ByLargestNumberOfViews())
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getBySearchAndPage(req: Request<{search: string, page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Goods.getBySearchAndPage(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
  static async getBySearchAndCategoryAndPage(req: Request<{search: string, category: string, page: number}, {}, {}>, res: Response<IResponse>) {
    try {
      res.send(await Db.Goods.getBySearchAndCategoryAndPage(req.params))
    } catch (err) {
      res.send(generateWrongResponse(err))
    }
  }
}