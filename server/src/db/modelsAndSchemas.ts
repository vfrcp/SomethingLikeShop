import { model, Schema } from "mongoose";
import { ICategory, IGood, IOrder, IUser } from "./types";

const userSchema = new Schema<IUser>({
  username: {type: String, required: true},
  _id: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
})
const goodsSchema = new Schema<IGood>({
  name: {type: String, required: true},
  _id: {type: String, required: true},
  price: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  imagesPaths: {type: [String], required: true},
  ordersId: {type: [String], required: true},
  viewsAmount: {type: Number, required: true},
  ordersAmount: {type: Number, required: true}
})
const orderSchema = new Schema<IOrder>({
  buyerUsername: {type: String, required: true},
  _id: {type: String, required: true},
  address: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  confirmed: {type: Boolean, required: true},
  goodsId: {type: [String], required: true},
  done: {type: Boolean, required: true}
})
const categoriesSchema = new Schema<ICategory>({
  name: {type: String, required: true},
  _id: {type: String, required: true},
  goodsAmountWithThisCategory: {type: Number, required: true}
})

export const CategoriesModel = model<ICategory>("Categories", categoriesSchema)
export const UserModel = model<IUser>("Users", userSchema)
export const GoodsModel = model<IGood>("Goods", goodsSchema)
export const OrdersModel = model<IOrder>("Orders", orderSchema)