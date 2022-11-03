import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "./auth/login";
import { AdminRegister } from "./auth/register";
import "./styles.sass";

export const Admin = ({type}: {type: "login" | "register"}) => {

  return(<section className="AdminAuth">{
    type === "login"? 
      <AdminLogin/>:
      <AdminRegister/>
  }</section>)
}