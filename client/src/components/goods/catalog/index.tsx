import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../../config";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { CategoriesList } from "../../reuse/categoriesList";
import { ChangePage } from "../../reuse/changePage";
import { Search } from "../../reuse/searchInput";
import "./styles.sass";

export const GoodsCatalogForClients = () => {
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()
  const {category} = useParams()
  const {goods} = useTypedSelector(state => state)
  const {getGoodsByPageAction, getGoodsByPageAndCategoryAction, getGoodsBySearch, getGoodsBySearchAndCategoryAction} = useAction()
  useEffect(() => {
    if(category) {
      getGoodsByPageAndCategoryAction({category, page})
    }else {
      getGoodsByPageAction(page)
    }
  }, [category, page])
  useEffect(() => {
    if(goods.error === "Товары не найдены") {
      setPage(page - 1)
    }
  }, [goods])
  const wrappedFuncForSearch = (search: string) => {
    if(!search) !!category? getGoodsByPageAndCategoryAction({category, page}): getGoodsByPageAction(1)
    !!category? getGoodsBySearchAndCategoryAction(search, category, page): getGoodsBySearch(search, page) 
  }
  const moveToGoodPage = (id: string) => {
    navigate(`/goods/good/${id}`)
  }
  return(
    <section className="GoodsCatalogClient">
      <Container>
        <Search whatSearch={"Товаров"} by={[{value: "По имени", func: wrappedFuncForSearch}]}/>
        <Row>
          <Col xs="2">
            <CategoriesList/>
          </Col>
          <Col>{
            goods.goods?.map(good => {
              return(
                <Card>
                  <Card.Body>
                    <Card.Img height="400px" src={`${config.server.link}/${good.imagesPaths[0]}`}/>
                  </Card.Body>
                  <Card.Body>
                    {good.name}
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="danger" onClick={() => moveToGoodPage(good._id)}>Перейти на страницу товара</Button>
                  </Card.Footer>
                </Card>
              )
            })
          }</Col>
        </Row>
      </Container>
      <div className="changePageWrap"><ChangePage page={page} setPage={setPage}/></div>
    </section>
  )
}