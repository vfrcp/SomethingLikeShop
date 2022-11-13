import React, { useEffect } from "react";
import { RoutesElements } from "./routes";
import {Header} from "./header"
import { BrowserRouter } from "react-router-dom";
import { useAction } from "../hooks/useAction";

function App() {
  const {getUserDataAction} = useAction()
  useEffect(() => { 
    getUserDataAction()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <RoutesElements/>
      </BrowserRouter>
    </div>
  );
}

export default App;
