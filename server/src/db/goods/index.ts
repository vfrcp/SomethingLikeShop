import { v4 as createId } from "uuid";
import { Db } from "..";
import { config } from "../../config";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { dbAnswers } from "../dbAnswers";
import { GoodsModel } from "../modelsAndSchemas";

export class Goods {
  static _generateStartAndEndIndex(page: number) {
    return {
      start: page === 1? 0 : (page -1) * config.db.goodsPageAmount,
      end: page * config.db.goodsPageAmount
    }
  }
  static async getById({id}: {id: string}): Promise<IResponse> {
    try {
      const good = await GoodsModel.findById(id)
      if(!good) throw dbAnswers.notFoundGood
      good.viewsAmount++
      await good.save()
      return {status: "success", body: [good], message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getByPage({page}: {page: number}): Promise<IResponse> {
    try {
      const indexes = this._generateStartAndEndIndex(page)
      //TODO: Позже добавить сортировку, еще не придумал по чему
      const goods = await GoodsModel.find().skip(indexes.start).limit(indexes.end)
      if(!goods[0]) throw dbAnswers.notFoundGoods
      return {status: "success", body: goods, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getByPageAndCategory({page, category}: {page: number, category: string}): Promise<IResponse> {
    try {
      const indexes = this._generateStartAndEndIndex(page)
      const goods = await GoodsModel.find({category}).skip(indexes.start).limit(indexes.end)
      if(!goods[0]) throw dbAnswers.notFoundGoods
      return {status: "success", body: goods, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async create(good: {name: string, price: string, description: string, category: string, imagesPaths: string[]}): Promise<IResponse> {
    try {
      const _id = createId()
      const newGood = new GoodsModel({
        _id,
        viewsAmount: 0,
        ordersAmount: 0,
        ordersId: [],
        ...good
      })
      await newGood.save()
      await Db.Categories.increaseAmount({name: good.category})
      return {status: "success", body: [newGood], message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async edit({id, newGoodData, imagesPaths}: {id: string, newGoodData: {
    name: string
    price: string
    description: string
    category: string,
  }, imagesPaths: string[]}): Promise<IResponse> {
    try {
      const good = await GoodsModel.findById(id)
      if(!good) throw dbAnswers.notFoundGood
      good.name = newGoodData.name
      good.price = newGoodData.price
      good.description = newGoodData.description
      good.category = newGoodData.category
      good.imagesPaths = imagesPaths

      await good.save()
      return {status: "success", body: null, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async delete({id}: {id: string}): Promise<IResponse> {
    try {
      const good = await GoodsModel.findById(id)
      if(!good) throw dbAnswers.notFoundGood
      await Db.Categories.decreaseAmount({name: good.category})
      await good.delete()
      return {status: "success", body: null, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async get10ByLargestNumberOfViews(): Promise<IResponse> {
    try {
      const goods = await GoodsModel.find().sort({viewsAmount: -1}).limit(10)
      if(!goods) throw dbAnswers.notFoundGoods
      return {status: "success", body: goods, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getByIds({ids}: {ids: string[]}): Promise<IResponse> {
    try {
      const goods = await GoodsModel.find().where("_id").in(ids)
      return {status: "success", body: goods, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getBySearchAndPage({search, page}: {search: string, page: number}): Promise<IResponse> {
    try {
      const indexes = this._generateStartAndEndIndex(page)
      const goods = await GoodsModel.find({name: {"$regex": search, "$options": "i"}}).sort({viewsAmount: - 1}).skip(indexes.start).limit(indexes.end)
      if(!goods[0]) throw dbAnswers.notFoundGoods
      return {status: "success", body: goods, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getBySearchAndCategoryAndPage({search, category, page}: {search: string, category: string, page: number}): Promise<IResponse> {
    try {
      const indexes = this._generateStartAndEndIndex(page)
      const goods = await GoodsModel.find({$and: [{category}, {name: {"$regex": search, "$options": "i"}}]}).sort({viewsAmount: -1}).skip(indexes.start).limit(indexes.end)
      if(!goods[0]) throw dbAnswers.notFoundGoods
      return {status: "success", body: goods, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
}