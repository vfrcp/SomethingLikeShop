import React, { useEffect, useState} from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../../config";
import { useAction } from "../../../../../hooks/useAction";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { ChangePage } from "../../../../reuse/changePage";
import "./styles.sass";

export const GoodsCatalog = () => {
  const [page, setPage] = useState<number>(1)
  const {getGoodsByPageAction, deleteGoodAction} = useAction()
  const navigate = useNavigate()
  const {goods} = useTypedSelector(state => state)
  const deleteGood = (id: string) => {
    deleteGoodAction(id)
  }
  const edit = (id: string) => {
    navigate(`/admin/dashboard/goods/edit/${id}`)
  }
  useEffect(() => { 
    getGoodsByPageAction(page)
  }, [page])
  useEffect(() => {
    if(goods.error === "Товары не найдены") {
      setPage(page - 1)
    }
  }, [goods])
  return(
    <section className="GoodsCatalogAdmin">
      <Container>
        <Row><Col>{
      goods.goods? 
        goods.goods.map(good => {
          return(
              <Card>
                <Card.Header>{good.name}</Card.Header>
                <Card.Img style={{width: "230px"}} src={`${config.server.link}/${good.imagesPaths[0]}`}/>
                <Card.Body>
                  {good.description}
                </Card.Body>
                <Card.Footer>
                  {good.price}
                  <Button onClick={() => edit(good._id)}>Изменить</Button>
                  <Button onClick={() => deleteGood(good._id)}>Удалить</Button>
                </Card.Footer>
              </Card>)
          }): <div>{goods.loading? "Загрузка...": goods.error}</div>
        }</Col></Row>
      </Container>
      <div className="changePageWrap"><ChangePage page={page} setPage={setPage}/></div>
    </section>
  )
} 