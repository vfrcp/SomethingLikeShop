export interface IGood {
  _id: string,
  name: string,
  price: string
  description: string
  category: string
  ordersId: IOrder[]
  imagesPaths: string[]
}
export interface ICategory {
  _id: string
  name: string
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
export interface IConfig {
  server: {
    link: string
  }
}