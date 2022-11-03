import React, { useEffect } from "react";
import { Container, Col, Row, Carousel, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export const GoodPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {getGoodByIdAction} = useAction()
  const {goods} = useTypedSelector(state => state)
  useEffect(() => {
  if(!id) {
    navigate("/")
  }else {
    getGoodByIdAction(id)
  }
  }, [])
  const addToCart = () => {
    if(!id) return
    const cartString = localStorage.getItem("cart")
    if(cartString) {
      const cart = JSON.parse(cartString) as {id: string, amount: number}[]
      let added: boolean = false
      cart.forEach((cartItem, index) => {
        if(cartItem.id === id){ 
          cart[index].amount++
          added = true
        }
      })
      if(!added) {
        cart.push({id, amount: 1})
      }
      localStorage.setItem("cart", JSON.stringify(cart))
    }else {
      localStorage.setItem("cart", JSON.stringify([{id, amount: 1}]))
    }
    alert("Товар добавлен в корзину")
  }

  return(
    <section>{
        goods?.goods?[0] &&
        <Container>{
          <Row><Col xs="7">
            <Carousel>{
              goods.goods[0].imagesPaths.map(imagePath => {
                return(
                  <Carousel.Item>
                    <img width="100%" height="600px" src={`${config.server.link}/${imagePath}`} alt=""/>
                  </Carousel.Item>
              )})
            }</Carousel>
            <div className="goodName">Название товара: {goods.goods[0].name}</div>
            <div className="description">Описание товара: {goods.goods[0].description}</div>
            <div className="category">Категория товара: {goods.goods[0].category}</div>
            <div className="controlAndPrice">
              <div className="price">Цена: {goods.goods[0].price}₴</div>
              <Button variant="danger" onClick={addToCart}>Добавить в корзину</Button>
            </div>
          </Col></Row>
        }</Container>: <div>{goods.loading? "Загрузка...": goods.error}</div>
    }</section>
  )
}