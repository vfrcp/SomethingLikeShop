import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAction } from "../../../hooks/useAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ChangePage } from "../changePage";
import "./styles.sass";

export const CategoriesList = () => {
  const [categoriesPage, setCategoriesPage] = useState<number>(1)
  const {categories} = useTypedSelector(state => state)
  const {getCategoriesByPageAction} = useAction()
  useEffect(() => {
    getCategoriesByPageAction(categoriesPage)
  }, [categoriesPage])
  useEffect(() => {
    if(categories.error === "Категории не найдены") {
      setCategoriesPage(categoriesPage - 1)
    }
  }, [categories])
  return(
    <section className="CategoriesList">
      <div style={{textAlign: "center"}}>Категории</div>
      <ListGroup>{
        categories.categories? categories.categories.map(category => {
          return(
            <Link to={`/goods/catalog/${category.name}`}><ListGroup.Item className="category" key={category._id}>{category.name}</ListGroup.Item></Link>
          )
        }): <div>{categories.loading? "Загрузка...": categories.error}</div>
      }</ListGroup>
      <ChangePage page={categoriesPage} setPage={setCategoriesPage}/>
    </section>
  )
}