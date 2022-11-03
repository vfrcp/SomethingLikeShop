import React, { useEffect, useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Http } from "../../../../models/http";

export const AdminLogin = () => {
  const [emailInput, setEmailInput] = useState<string>("")
  const [isAdminExist, setIsAdminExist] = useState<boolean>(true)
  const [passwordInput, setPasswordInput] = useState<string>("") 
  const navigate = useNavigate()
  useEffect(() => {(async () => {
    const isAdminExistFromServer = await Http.Admin.isAdminExist()
    isAdminExistFromServer.status === "wrong"?
      alert(isAdminExistFromServer.message):
      setIsAdminExist(isAdminExistFromServer.body)
  })()}, [])
  const login = async () => {
    const response = await Http.Admin.login({password: passwordInput, email: emailInput})
    if(response.status === "success") navigate("/admin/dashboard")  
    if(response.status === "wrong") alert(response.message)
  }
  return(
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs="5">
          <Form className="form p-3">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Почта</Form.Label>
            <Form.Control type="email" value={emailInput} placeholder="Введите почту" onChange={(e) => {
              setEmailInput(e.currentTarget.value)
            }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" value={passwordInput} placeholder="Введите пароль" onChange={(e) => {
              setPasswordInput(e.currentTarget.value)
            }}/>
          </Form.Group>
          <Button variant="danger" type="button" onClick={login}>Войти</Button>
          <Button onClick={() => alert("Свяжитесь с создателем сайта чтобы удалить старый профиль")}>Забыли пароль?</Button>
          <Link to="/admin/register">Register</Link>
        </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}