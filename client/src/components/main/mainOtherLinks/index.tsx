import React from "react";
import { Link } from "react-router-dom";
import "./styles.sass";

export const MainOtherLinks = () => {
  return(
    <section className="MainFooter">
      <Link to="/goods/catalog">Каталог товаров с всеми категориями</Link>
    </section>
  )
}