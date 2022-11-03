import React from "react";
import { Col, Container, Row} from "react-bootstrap";
import { CategoriesList } from "../reuse/categoriesList";
import { MainOtherLinks } from "./mainOtherLinks";
import { TopGoods } from "./topGoods";

export const Main = () => {
  return(<section className="Main">
    <Container>
      <Row>
        <Col xs="2">
          <CategoriesList/>
        </Col>
        <Col>
          <TopGoods/>
        </Col>
      </Row>
      <Row><Col>
        <MainOtherLinks/>
      </Col></Row>
    </Container>
  </section>)
}