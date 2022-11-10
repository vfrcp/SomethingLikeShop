import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAction } from "../../../../../hooks/useAction";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { ChangePage } from "../../../../reuse/changePage";
import { CheckIsAdmin } from "../../../../reuse/checkIsAdmin";
import { Search } from "../../../../reuse/searchInput";

export const CategoriesCatalog = () => {
  const [page, setPage] = useState<number>(1)
  const {getCategoriesByPageAction, deleteCategoryByNameAction, getCategoriesBySearchAndPageAction} = useAction()
  const navigate = useNavigate()
  const {categories} = useTypedSelector(state => state)
  useEffect(() => {
    if(categories.error === "Категории не найдены") {
      setPage(page - 1)
    }
    getCategoriesByPageAction(page)
  }, [page, categories])
  const deleteCategoryByName = (name: string) => {
    deleteCategoryByNameAction(name)
  }
  const searchWrapFunc = (string: string) => {
    getCategoriesBySearchAndPageAction(string, page)
  }
  //TODO: <CheckIsAdmin/> Это проверка на админа. Начал ее делать, пока еще ловлю луп который шлет тысячи запросов.
  return (
    <section>
      <Search whatSearch="Категории" by={[{value: "Имени", func: searchWrapFunc}]}/>
      <Container>
        <Row><Col xs="6">{
          categories.categories?.map(category => {
            return(
              <Card key={category._id}>
                <Card.Title>{category.name}</Card.Title>
                <Card.Footer>
                  <Button variant="danger" onClick={() => deleteCategoryByName(category.name)}>Удалить</Button>
                </Card.Footer>
              </Card>
            )
          })  
        }</Col></Row>
      </Container>
      <div className="changePageWrap"><ChangePage page={page} setPage={setPage}/></div>
    </section>
  )
}