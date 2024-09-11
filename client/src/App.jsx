import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Outlet />
    </div>
  );
}

export default App;
