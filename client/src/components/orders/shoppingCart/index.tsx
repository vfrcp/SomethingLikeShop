import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CreateOrder } from "./createOrder";
import { GoodsInCart } from "./goodsInCart";

export const ShoppingCart = () => {
  return(
    <section>
      <Container>
        <Row>
          <Col>
            <GoodsInCart/>
          </Col>
          <Col>
            <CreateOrder/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}