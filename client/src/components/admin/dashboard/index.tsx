import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.sass";

export const AdminDashboard = () => {
  return(
    <section className="AdminDashboard">
      <Container>
        <Row><Col xs="5" className="justify-content-md-center">
          <div>Панель администратора</div>
          <ListGroup>
            <Link to="/admin/dashboard/ordersCatalog"><ListGroup.Item className="listItem">Заказы</ListGroup.Item></Link>
            <Link to="/admin/dashboard/categoriesCatalog"><ListGroup.Item className="listItem">Категории</ListGroup.Item></Link>
            <Link to="/admin/dashboard/createCatalog"><ListGroup.Item className="listItem">Создать новую категорию</ListGroup.Item></Link>
            <Link to="/admin/dashboard/goodsCatalog"><ListGroup.Item className="listItem">Товары</ListGroup.Item></Link>
            <Link to="/admin/dashboard/createGood"><ListGroup.Item className="listItem">Создать новый товар</ListGroup.Item></Link>
          </ListGroup>
        </Col></Row>
      </Container>
    </section>
  )
}