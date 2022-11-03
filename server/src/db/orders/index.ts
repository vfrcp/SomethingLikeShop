import { v4 as createId } from "uuid";
import { config } from "../../config";
import { generateWrongResponse } from "../../funcs";
import { IResponse } from "../../types";
import { dbAnswers } from "../dbAnswers";
import { GoodsModel, OrdersModel } from "../modelsAndSchemas";

export class Orders {
  static async create(orderData: {
    buyerUsername: string,
    address: string,
    phoneNumber: string,
    goodsId: string
  }): Promise<IResponse> {
    try {
      const good = await GoodsModel.findById(orderData.goodsId[0])
      if(!good) throw dbAnswers.notFoundGood
      const _id = createId()
      const newOrder = new OrdersModel({
        _id,
        confirmed: false,
        done: false,
        ...orderData
      }) 
      await newOrder.save()
      good.ordersId.push(_id)
      good.ordersAmount++
      await good.save()
      return {status: "success", body: [newOrder], message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getUnconfirmedByPage({page}: {page: number}): Promise<IResponse> {
    try {
      const startSearchIndex = page === 1? 0 : (page -1) * config.db.goodsPageAmount 
      const endSearchIndex = page * config.db.goodsPageAmount
      const orders = await OrdersModel.find({confirmed: false}).skip(startSearchIndex).limit(endSearchIndex)
      if(!orders[0]) throw dbAnswers.notFoundOrders
      return {status: "success", body: orders, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getConfirmedByPage({page}: {page: number}): Promise<IResponse> {
    try {
      const startSearchIndex = page === 1? 0 : (page -1) * config.db.goodsPageAmount 
      const endSearchIndex = page * config.db.goodsPageAmount
      const orders = await OrdersModel.find({confirmed: true}).skip(startSearchIndex).limit(endSearchIndex)
      if(!orders) throw dbAnswers.notFoundOrders
      return {status: "success", body: orders, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getUndoneByPage({page}: {page: number}): Promise<IResponse> {
    try {
      const startSearchIndex = page === 1? 0 : (page -1) * config.db.goodsPageAmount 
      const endSearchIndex = page * config.db.goodsPageAmount
      const orders = await OrdersModel.find({done: false}).skip(startSearchIndex).limit(endSearchIndex)
      if(!orders[0]) throw dbAnswers.notFoundOrders
      return {status: "success", body: orders, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async getDoneByPage({page}: {page: number}): Promise<IResponse> {
    try {
      const startSearchIndex = page === 1? 0 : (page -1) * config.db.goodsPageAmount 
      const endSearchIndex = page * config.db.goodsPageAmount
      const orders = await OrdersModel.find({done: true}).skip(startSearchIndex).limit(endSearchIndex)
      if(!orders[0]) throw dbAnswers.notFoundOrders
      return {status: "success", body: orders, message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async done({id}: {id: string}): Promise<IResponse> {
    try {
      const order = await OrdersModel.findById(id)
      if(!order) throw dbAnswers.notFoundOrder
      if(order.done) throw dbAnswers.alreadyDoneOrder
      order.done = true
      await order.save()
      return {status: "success", body: [order], message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async confirm({id}: {id: string}): Promise<IResponse> {
    try {
      const order = await OrdersModel.findById(id)
      if(!order) throw dbAnswers.notFoundOrder
      if(order.confirmed) throw dbAnswers.alreadyConfirmedOrder
      order.confirmed = true
      await order.save()
      return {status: "success", body: [order], message: null}
    }catch (err) {
      return generateWrongResponse(err)
    }
  }
  static async deleteById({id}: {id: string}): Promise<IResponse> {
    try {
      const order = await OrdersModel.findOne({_id: id})
      if(!order) throw dbAnswers.notFoundOrder
      await order.delete()
      return {status: "success", body: [order], message: null}
    } catch (err) {
      return generateWrongResponse(err)
    }
  }
}