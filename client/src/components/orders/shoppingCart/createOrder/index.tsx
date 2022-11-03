import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAction } from "../../../../hooks/useAction";

export const CreateOrder = () => {
  const [buyerUsername, setBuyerUsername] = useState<string>("") 
  const [address, setAddress] = useState<string>("")
  const [phoneNumber, setPhoneNumber] =  useState<string>("")
  const {createOrderAction} = useAction()
  const order = () => {
    const cartString = localStorage.getItem("cart")
    if(!cartString) return
    const goodsId = JSON.parse(cartString)
    createOrderAction({buyerUsername, address, phoneNumber, goodsId})
  } 
  return(
    <section>
      <Form>
        <Form.Group>
          <Form.Label>Имя и фамилия</Form.Label>
          <Form.Control required value={buyerUsername} onChange={(e) => {
            setBuyerUsername(e.currentTarget.value)
          }}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Город, адрес почты</Form.Label>
          <Form.Control required value={address} onChange={(e) => {
            setAddress(e.currentTarget.value)
          }}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control type="number" required value={phoneNumber} onChange={(e) => {
            setPhoneNumber(e.currentTarget.value)
          }}/>
        </Form.Group>
        <Button onClick={order}>Заказать</Button>
      </Form>
    </section>
  )
}