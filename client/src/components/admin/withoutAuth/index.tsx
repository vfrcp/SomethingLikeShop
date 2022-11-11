import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Http } from "../../../models/http";

export const WithoutAuth = () => {
  const [isAdminAlreadyExist, setIsAdminExist] = useState<boolean>(false)
  useEffect(() => {(async () => {
    const response = await Http.Admin.isAdminExist()
    console.log(response)
    if(response.status === "success") setIsAdminExist(true)
  })()}, [])
  return (
    <section>
      <div>Для продолжения этого действия авторизуйтесь</div>
      <div className="links">
        <Link to="admin/login">Войти</Link>
        {isAdminAlreadyExist && <Link to="admin/register">Зарегистрироваться</Link>}
      </div>
    </section>
  )
}