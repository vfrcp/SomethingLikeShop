import React, { FormEvent, DragEvent, useRef, useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useAction } from "../../../../../hooks/useAction";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { Http } from "../../../../../models/http";
import "./styles.sass";

export const CreateGood = () => {
  const formRef = useRef<null | HTMLFormElement>(null)
  const [categoryInput, setCategoryInput] = useState<string>("")
  const [images, setImages] = useState<File[]>([])
  const [isDrag, setIsDrag] = useState<boolean>(false)
  const {categories} = useTypedSelector(state => state)
  const {get10CategoriesBySearchAction} = useAction()
  
  useEffect(() => {
    get10CategoriesBySearchAction(categoryInput)
  }, [categoryInput])

  const create = async (e: FormEvent) => {
    e.preventDefault()
    if(!formRef.current) return
    const formData = new FormData(formRef.current)
    images.forEach((file) => {
      formData.append(`${file.name}`, file)
    })
    console.log(await Http.Goods.create(formData))
  }
  const dragStartAndOverHandle = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrag(true)
  }
  const dragLeaveHandle = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrag(false)
  }
  const dropHandle = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    try {
      const imagesFromDrag = Array.from(e.dataTransfer.files).filter(file => file.type.includes("image"))
      if(!imagesFromDrag[0]) throw "Только фотографии можно добавлять" 
      setImages([...images, ...imagesFromDrag])
      setIsDrag(false)
    } catch (err) {
      alert(err)
    }
  }
  const deleteImage = (index: number) => {
    setImages(images.filter((img, i) => i !== index))
  }
  const setPreviewImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    newImages.unshift(images[index])
    setImages(newImages)
  }
  return(
    <section className="CreateGood">
      <Container>
        <Row>
          <Col xs="4">
            <Form ref={formRef} onSubmit={(e) => {create(e)}}>
              <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" name="name" placeholder="Введите имя"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Цена</Form.Label>
                <Form.Control type="number" name="price" placeholder="Введите цену"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Описание</Form.Label>
                <Form.Control type="text" name="description" as="textarea" placeholder="Введите описание"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Введите категорию</Form.Label>
                <Form.Control type="text" name="category" placeholder="Выберите категорию" value={categoryInput} onChange={(e) => {
                  setCategoryInput(e.currentTarget.value)
                }}/>{
                  categories.categories && <ListGroup>{
                    categories.categories.map(category => {
                      if(category.name === categoryInput) return <></>
                      return (<ListGroup.Item className="categoryName" key={category._id} onClick={() => setCategoryInput(category.name)}>
                        {category.name}
                      </ListGroup.Item>)
                    })
                }</ListGroup>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Перетащите фотографии сюда</Form.Label>
                <div className="dragAreaWrap">
                  <div className={isDrag? "dragArea active": "dragArea"}
                    onDragStart={(e) => dragStartAndOverHandle(e)}
                    onDragLeave={(e) => dragLeaveHandle(e)}
                    onDragOver={(e) => dragStartAndOverHandle(e)}
                    onDrop={(e) => dropHandle(e)}>
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Или нажмите чтобы отправить сюда</Form.Label>
                <Form.Control type="file" multiple/>
              </Form.Group>
              <Button variant="danger" type="submit">Создать</Button>
            </Form>
          </Col>{
          !!images[0] && 
          <Col xs="4">
            <div className="images">{
              images.map((img, index) => {
                return(
                  <Card key={img.size} style={{width: "250px"}}>
                    <Card.Img src={URL.createObjectURL(img)}/>
                    <Card.Body className="imageButtons">
                      <Button variant="success" onClick={() => setPreviewImage(index)}>Задать как главную</Button>
                      <Button variant="danger" onClick={() => deleteImage(index)}>Удалить</Button>
                    </Card.Body>
                  </Card>)
              })
            }</div>
          </Col>
        }</Row>
      </Container>
    </section>
  )
}