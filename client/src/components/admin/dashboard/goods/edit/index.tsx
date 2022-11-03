import React, { useEffect, useState, DragEvent, useRef, FormEvent } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { config } from "../../../../../config";
import { useAction } from "../../../../../hooks/useAction";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import "./styles.sass";

export const EditGood = () => {
  const {id} = useParams()
  const formRef = useRef<null | HTMLFormElement>(null)
  const [isDrag, setIsDrag] = useState<boolean>(false)
  const [images, setImages] = useState<(File | string)[]>([])
  const {getGoodByIdAction, editGoodByIdAction} = useAction()
  const {goods} = useTypedSelector(state => state)
  useEffect(() => {
    if(!id) return
    getGoodByIdAction(id)
  }, [])
  useEffect(() => {
    if(!goods.goods?.[0]) return
    setImages(goods.goods[0].imagesPaths)
  }, [goods])
  const edit = (e: FormEvent) => {
    e.preventDefault()
    if(!formRef.current || !id) return
    const formData = new FormData(formRef.current)
    const imagesLineByNameOrPath = images.map((img, i) => {
      return typeof img === "string"? img: img.name 
    })
    formData.append("rawImagesString", JSON.stringify(imagesLineByNameOrPath))
    images.forEach(image => {
      if(typeof image !== "string") {
        formData.append(`${image.name}`, image)
      }
    })
    editGoodByIdAction(id, formData)
    console.log(imagesLineByNameOrPath)
  }
  const deleteImage = (index: number) => {
    setImages(images.filter((img, i) => i !== index))
  }
  const changePreview = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    newImages.unshift(images[index])
    setImages(newImages)
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
  return(
    <section className="EditGood">{
      goods.goods?.[0]? 
      <Container>
        <Row>
          <Col>
            <Form onSubmit={edit} ref={formRef}>
              <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control name="name" defaultValue={goods.goods[0].name}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Описание</Form.Label>
                <Form.Control name="description" defaultValue={goods.goods[0].description}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Цена</Form.Label>
                <Form.Control name="price" defaultValue={goods.goods[0].price}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Категория</Form.Label>
                <Form.Control name="category" defaultValue={goods.goods[0].category}/>
              </Form.Group>
              <Form.Group className="dragAreaWrap">
                <Form.Label>Если вы хотите добавить новое фото, перетащите его сюда</Form.Label>
                <div className={isDrag? "dragArea active": "dragArea"}
                  onDragStart={(e) => dragStartAndOverHandle(e)}
                  onDragLeave={(e) => dragLeaveHandle(e)}
                  onDragOver={(e) => dragStartAndOverHandle(e)}
                  onDrop={(e) => dropHandle(e)}
                ></div>
              </Form.Group>
              <Form.Group>
                <Button variant="danger" type="submit">Изменить</Button>
              </Form.Group>
            </Form>
        </Col>
        <Col>
          <div className="images">{
            images.map((image, index) => {
              return(
                <Card>
                  <Card.Img height="200px" src={typeof image === "string"? `${config.server.link}/${image}`: URL.createObjectURL(image)}/>
                  <Card.Footer>
                    {index !== 0 && <Button onClick={() => changePreview(index)}>Сделать главной</Button>}
                    <Button variant="danger" onClick={() => deleteImage(index)}>Удалить</Button>
                  </Card.Footer>
                </Card>
              )})
          }</div>
        </Col>
        </Row>
      </Container>: <div>Загрузка...</div>
    }</section>
  )
}