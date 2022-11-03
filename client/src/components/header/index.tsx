import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import shoppingCart from "../../images/icons/shoppingCart.png";
import shoppingBasket from "../../images/icons/shopping-basket.png";

export const Header = () => {
  return(
  <Navbar bg="danger" className="Header mb-4">
    <Container>
      <Navbar.Brand>
        <Link to="/"><img src={shoppingCart} height="60px" alt="Main" /></Link>
      </Navbar.Brand>
      <Link to="/admin/dashboard">Панель управления админ</Link>
      <Link to="/shoppingCart">Корзина</Link>
    </Container>
  </Navbar>)
}