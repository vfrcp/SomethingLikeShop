import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Http } from "../../../models/http";

export const CheckIsAdmin = () => {
  const navigate = useNavigate()
  useEffect(() => {(async () => {
    // const response = await Http.Admin.isKeyValid()
    // if(response.status === "wrong" || response.body !== true) return navigate("admin/withoutAuth") 
  })()}, [])

  return (
    <></>
  )
}