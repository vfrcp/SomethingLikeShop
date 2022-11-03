import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Http } from "../../../../models/http";

export const AdminRegister = () => {
  const [emailInput, setEmailInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("")

  const [isPasswordsEquals, setIsPasswordsEquals] = useState<" не" | "">("")

  useEffect(() => {
    if(passwordInput === confirmPasswordInput) {
      setIsPasswordsEquals("")
    } else {
      setIsPasswordsEquals(" не")
    }
  }, [passwordInput, confirmPasswordInput])
  const register = async () => {
    if(isPasswordsEquals === " не") return
    console.log(await Http.Admin.register({email: emailInput, password: passwordInput}))
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
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Проверка пароля</Form.Label> <br/>
            <Form.Label>{`Пароли${isPasswordsEquals} совпадают`}</Form.Label>
            <Form.Control type="password" value={confirmPasswordInput} placeholder="Введите пароль еще раз" onChange={(e) => {
              setConfirmPasswordInput(e.currentTarget.value)
            }}/>
          </Form.Group>
          <Button variant="danger" type="button" onClick={register}>Зарегистрироваться</Button>
        </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}