import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
