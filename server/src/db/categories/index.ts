import { v4 as createId } from "uuid";
import { config } from "../../config";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { dbAnswers } from "../dbAnswers";
import { CategoriesModel } from "../modelsAndSchemas";

export class Categories {
  static _generateIndexes = (page: number) => {
    return {
      start: page === 1? 0 : (page -1) * config.db.goodsPageAmount,
      end: page * config.db.goodsPageAmount
    }
  }
  static async get10BySearch({searchString}: {searchString: string}): Promise<IResponse> {
    try {
      const categories = await CategoriesModel.find({name: {"$regex": searchString}}).sort({viewsAmount: - 1}).limit(10)
      if(!categories[0]) throw dbAnswers.notFoundCategories
      return {status: "success", body: categories, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async increaseAmount({name}: {name: string}): Promise<IResponse> {
    try {
      const category = await CategoriesModel.findOne({name})
      if(!category) throw dbAnswers.notFoundCategory
      category.goodsAmountWithThisCategory++
      await category.save()
      return {status: "success", body: [category], message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async decreaseAmount({name}: {name: string}): Promise<IResponse> {
    try {
      const category = await CategoriesModel.findOne({name})
      if(!category) throw dbAnswers.notFoundCategory
      category.goodsAmountWithThisCategory--
      await category.save()
      return {status: "success", body: [category], message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getAllByPage({page}: {page: number}): Promise<IResponse> {
    try {
      const indexes = this._generateIndexes(page)
      const categories = await CategoriesModel.find().skip(indexes.start).limit(indexes.end)
      console.log(categories)
      if(!categories[0]) throw dbAnswers.notFoundCategories
      return {status: "success", body: categories, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getByName({name}: {name: string}): Promise<IResponse> {
    try {
      const category = await CategoriesModel.findOne({name})
      if(!category) throw dbAnswers.notFoundCategory
      return {status: "success", body: [category], message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async create({name}: {name: string}): Promise<IResponse> {
    try {
      const _id = createId()
      const newCategory = new CategoriesModel({
        name,
        _id,
        goodsAmountWithThisCategory: 0
      })
      await newCategory.save()
      return {status: "success", body: [newCategory], message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async delete({name}: {name: string}): Promise<IResponse> {
    try {
      const category = await CategoriesModel.findOne({name})
      if(!category) throw dbAnswers.notFoundCategory
      await category.delete()
      return {status: "success", body: null, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getBySearchAndPage({search, page}: {search: string, page: number}): Promise<IResponse> {
    try {
      const indexes = this._generateIndexes(page)
      const categories = await CategoriesModel.find({name: {"$regex": search, "$options": "i"}}).skip(indexes.start).limit(indexes.end)
      if(!categories[0]) throw dbAnswers.notFoundCategories
      return {status: "success", body: categories, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
}