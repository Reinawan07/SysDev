import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider, } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ViewPage from './pages/ViewPage';


const auth = () => {
  const access_token = localStorage.access_token;
  if (!access_token){
    throw redirect("/login");
  }
  return null;
}

const authLogin = () => {
  const access_token = localStorage.access_token;
  if (access_token){
    throw redirect("/view");
  }
  return null;
}

const home = () => {
    throw redirect("/login");
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    loader: home,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: authLogin,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: authLogin,
  },
  {
    path: "/view",
    element: <ViewPage />,
    loader: auth,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)