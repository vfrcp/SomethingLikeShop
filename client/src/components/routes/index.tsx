import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "../admin";
import { AdminDashboard } from "../admin/dashboard";
import { CategoriesCatalog } from "../admin/dashboard/categories/catalog";
import { CreateCategory } from "../admin/dashboard/categories/create";
import { GoodsCatalog } from "../admin/dashboard/goods/catalog";
import { CreateGood } from "../admin/dashboard/goods/create";
import { EditGood } from "../admin/dashboard/goods/edit";
import { OrdersCatalog } from "../admin/dashboard/orders/catalog";
import { Error404 } from "../error404";
import { GoodsCatalogForClients } from "../goods/catalog";
import { GoodPage } from "../goods/goodPage";
import { Main } from "../main";
import { ShoppingCart } from "../orders/shoppingCart";

export const RoutesElements = () => {
  return(
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/goods/catalog" element={<GoodsCatalogForClients/>}/>
      <Route path="/goods/catalog/:category" element={<GoodsCatalogForClients/>}/>
      <Route path="/goods/good/:id" element={<GoodPage/>}/>
      <Route path="/shoppingCart" element={<ShoppingCart/>}/>
      <Route path="/admin/login" element={<Admin type="login"/>}/>
      <Route path="/admin/register" element={<Admin type="register"/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/admin/dashboard/categoriesCatalog" element={<CategoriesCatalog/>}/>
      <Route path="/admin/dashboard/createCatalog" element={<CreateCategory/>}/>
      <Route path="/admin/dashboard/createGood" element={<CreateGood/>}/>
      <Route path="/admin/dashboard/goods/edit/:id" element={<EditGood/>}/>
      <Route path="/admin/dashboard/goodsCatalog" element={<GoodsCatalog/>}/>
      <Route path="/admin/dashboard/ordersCatalog" element={<OrdersCatalog/>}/>
      <Route path="*" element={<Error404/>}/>
    </Routes>
  )
}