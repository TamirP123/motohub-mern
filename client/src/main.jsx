import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import CarDetailsPage from "./pages/CarDetailsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminInventoryPage from "./pages/AdminInventoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "car/:id", element: <CarDetailsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "adminlogin", element: <AdminLogin /> },
      { 
        path: "admin/dashboard", 
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute> 
      },
      { 
        path: "admin/inventory", 
        element: <ProtectedRoute><AdminInventoryPage /></ProtectedRoute> 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
