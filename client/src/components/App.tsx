import React from "react";
import { RoutesElements } from "./routes";
import {Header} from "./header"
import { BrowserRouter } from "react-router-dom";

function App() {
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
