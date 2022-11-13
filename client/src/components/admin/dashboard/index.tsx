import React, { useEffect, useState } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Http } from "../../../models/http";
import "./styles.sass";

export const AdminDashboard = () => {
  const [isAdminExist, setIsAdminExist] = useState()
  const {user} = useTypedSelector(state => state)
  useEffect(() => {(async () => {
    // const response = await Http.Admin.isKeyValid()
    // console.log(response)
  })()}, [])
  const logout = () => {
    //TODO: Сделать функции логаута
    alert("В процессе создания")
  }
  return(
    <section className="AdminDashboard">
      <Container>
        <Row><Col xs="5" className="justify-content-md-center">
          <div>Панель администратора</div>
          <ListGroup>
            {!user.user && <Link to="/admin/login"><ListGroup.Item className="listItem">Войти</ListGroup.Item></Link>}
            {user.user && <ListGroup.Item className="listItem" onClick={logout}>Выйти</ListGroup.Item>}
            {isAdminExist && <Link to="/admin/register"><ListGroup.Item className="listItem">Зарегистрироваться</ListGroup.Item></Link>}
            {user.user && <>
              <Link to="/admin/dashboard/ordersCatalog"><ListGroup.Item className="listItem">Заказы</ListGroup.Item></Link>
              <Link to="/admin/dashboard/categoriesCatalog"><ListGroup.Item className="listItem">Категории</ListGroup.Item></Link>
              <Link to="/admin/dashboard/createCatalog"><ListGroup.Item className="listItem">Создать новую категорию</ListGroup.Item></Link>
              <Link to="/admin/dashboard/goodsCatalog"><ListGroup.Item className="listItem">Товары</ListGroup.Item></Link>
              <Link to="/admin/dashboard/createGood"><ListGroup.Item className="listItem">Создать новый товар</ListGroup.Item></Link>
            </>}
          </ListGroup>
        </Col></Row>
      </Container>
    </section>
  )
}