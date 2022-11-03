import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAction } from "../../../../hooks/useAction";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

export const GoodsInCart = () => {
  const [cart, setCart] = useState<null | {id: string, amount: number}[]>(null)
  const {goods} = useTypedSelector(state => state)
  const {getGoodsByIdsAction} = useAction()
  useEffect(() => {
    const cartString = localStorage.getItem("cart")
    if(!cartString) return
    setCart(JSON.parse(cartString) as {id: string, amount: number}[])
  }, [])
  useEffect(() => {
    if(!cart) return
    const goodsId = cart.map(cartItem => cartItem.id)
    getGoodsByIdsAction(goodsId)
  }, [cart])
  const deleteFromCart = (id: string) => {
    if(!cart) return
    const newCart = cart.filter((cartItem, index) => {
      if(cartItem.id === id) {
        if(cartItem.amount >= 1) {
          cartItem.amount--
          return cartItem
        }
      } else return cartItem
    })
    console.log(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
    setCart(newCart)
  }
  return(
    <>{
    goods.goods && cart? <div>{
      goods.goods.map((good, index) => {
        if(cart[index]?.amount === 0) return <></> 
        return(
          <div key={good._id}>
            <div>Название товара:{good.name}</div>
            <div>Цена товара: {good.price}₴</div>
            <div>Количество единиц товара: {cart[index]?.amount}</div>
            <Button onClick={() => deleteFromCart(good._id)}>Удалить из корзины</Button>
          </div>)
      })
    }</div>: <div>{goods.loading? "Загрузка...": goods.error}</div>
    }</>
  )
}