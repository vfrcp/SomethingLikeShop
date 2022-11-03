import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../../../config";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export const TopGoods = () => {
  const {goods} = useTypedSelector(state => state)
  const {getGoodsByPageAction} = useAction()
  useEffect(() => {
    getGoodsByPageAction(1)
  }, [])
  return(
    <section className="GoodsInMain">
      <div>Топ 10 товаров по просмотрам</div>
      {goods.goods?.[0]? <Carousel>{
        goods.goods.map((good, index) => {
          if(index > 10) return <></>
          return(
            <Carousel.Item key={good._id}>
              <Link to={`/goods/good/${good._id}`}><img width={"100%"} height={"500px"} src={`${config.server.link}/${good.imagesPaths[0]}`} alt="" /></Link>
              <Carousel.Caption>{good.name}</Carousel.Caption>
            </Carousel.Item>
          )
        })
      }</Carousel>: <div>{goods.loading? "Загрузка...": goods.error}</div>
    }</section>
  )
}