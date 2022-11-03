import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAction } from "../../../../../hooks/useAction";

export const CreateCategory = () => {
  const [categoryNameInput, setCategoryNameInput] = useState<string>("")
  const {createCategoryAction} = useAction()
  const create = () => {
    createCategoryAction(categoryNameInput)
  }
  return(
    <section>
      <Container>
        <Col><Row xs="4">
          <Form>
            <Form.Group>
              <Form.Label>Создать новую категорию</Form.Label>
              <Form.Control value={categoryNameInput} required onChange={(e) => {
                setCategoryNameInput(e.currentTarget.value)
              }}/>
            </Form.Group>
            <Form.Group>
              <Button variant="danger" onClick={create}>Создать</Button>
            </Form.Group>
          </Form>
        </Row></Col>
      </Container>
    </section>
  )
}