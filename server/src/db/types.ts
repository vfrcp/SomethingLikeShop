export interface IUser {
  username: string
  _id: string
  email: string
  password: string
}
export interface IGood {
  name: string
  _id: string 
  price: string
  description: string
  category: string
  imagesPaths: string[]
  ordersId: string[]
  viewsAmount: number,
  ordersAmount: number,
}
export interface IOrder {
  buyerUsername: string
  _id: string
  address: string
  phoneNumber: string
  confirmed: boolean
  goodsId: string[]
  done: boolean
}
export interface ICategory {
  name: string
  _id: string
  goodsAmountWithThisCategory: number 
}