import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAction } from "../../../../../hooks/useAction";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { ChangePage } from "../../../../reuse/changePage";
import "./styles.sass";

export const OrdersCatalog = () => {
  const [page, setPage] = useState<number>(1)
  const [ordersCatalogType, setOrdersCatalogType] = useState<"unconfirmed" | "confirmed" | "undone" | "done">("unconfirmed")
  const {orders} = useTypedSelector(state => state)
  const {
    getUnconfirmedOrdersByPageAction, getConfirmedOrdersByPageAction,
    getUndoneOrdersByPageAction, getDoneOrdersByPageAction,
    confirmOrderByIdAction, doneOrderByIdAction,
    deleteOrderbyIdAction
  } = useAction()

  const confirm = (id: string) => {
    confirmOrderByIdAction(id)
  }
  const setDone = (id: string) => {
    doneOrderByIdAction(id)
  }
  const deleteOrder = (id: string) => {
    deleteOrderbyIdAction(id)
  }
  useEffect(() => {
    getUnconfirmedOrdersByPageAction(page)
  }, [page])
  useEffect(() => {
    let searchPage = page
    if(orders.error === "Заказы не найдены") {
      searchPage = searchPage - 1
    }
    switch (ordersCatalogType) {
      case "unconfirmed": getUnconfirmedOrdersByPageAction(searchPage)
        break
      case "confirmed": getConfirmedOrdersByPageAction(searchPage)
        break
      case "undone": getUndoneOrdersByPageAction(searchPage)
        break
      case "done": getDoneOrdersByPageAction(searchPage)
    }
  }, [ordersCatalogType,  page])

  return(
    <section className="OrdersCatalog">
      <Container>
        <Row>
          <Col xs="3">
            <ListGroup>
              <ListGroup.Item className={ordersCatalogType === "unconfirmed"? "listItem active": "listItem"} onClick={() => setOrdersCatalogType("unconfirmed")}>Не подтвержденные</ListGroup.Item>
              <ListGroup.Item className={ordersCatalogType === "confirmed"? "listItem active": "listItem"} onClick={() => setOrdersCatalogType("confirmed")}>подтвержденные</ListGroup.Item>
              <ListGroup.Item className={ordersCatalogType === "undone"? "listItem active": "listItem"} onClick={() => setOrdersCatalogType("undone")}>Не завершенные</ListGroup.Item>
              <ListGroup.Item className={ordersCatalogType === "done"? "listItem active": "listItem"} onClick={() => setOrdersCatalogType("done")}>Завершенные</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>{
          orders.orders?.map(order => {
            return(
              <Card>
                <Card.Body>Имя и фамилия: {order.buyerUsername}</Card.Body>
                <Card.Body>Номер телефона: {order.phoneNumber}</Card.Body>
                <Card.Body>Адрес: {order.address}</Card.Body>
                <Card.Footer>{
                  ordersCatalogType === "unconfirmed" && <Button onClick={() => confirm(order._id)}>Подтвердить</Button>
                }{
                  ordersCatalogType === "undone" && <Button onClick={() => setDone(order._id)}>Завершить</Button>
                }
                  <Button onClick={() => deleteOrder(order._id)} variant="danger">Удалить</Button>
                </Card.Footer>
              </Card>
            )})
        }</Col>
        </Row>
      </Container>
      <div className="ChangePageWrap">
        <ChangePage page={page} setPage={setPage}/>
      </div>
    </section>
  )
}