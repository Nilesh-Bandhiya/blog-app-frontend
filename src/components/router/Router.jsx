import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "../pages/Users";
import MainLayout from "../layout/MainLayout";
import { ProtectedLoginRoute, ProtectedAdminRoute, ProtectedLogoutRoute, ProtectedUserRoute } from "../auth/ProtectedRoutes";
import About from "../pages/About";
import UserDetail from "../pages/UserDetail";
import Blogs from '../pages/Blogs';
import Login from '../pages/Login';
import Register from '../pages/Register';
import BlogDetail from '../pages/BlogDetail';
import PageNotFound from '../pages/PageNotFound';

const Router = () => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout />,
          children: [
            { index: true, element: <Blogs  /> },
            { path: "myblogs", element: <ProtectedAdminRoute><Blogs  /></ProtectedAdminRoute> },
            { path: ":blogId", element: <ProtectedLoginRoute><BlogDetail /></ProtectedLoginRoute> },
            { path: "users", element: <ProtectedAdminRoute><Users /></ProtectedAdminRoute> },
            { path: "users/:userId", element: <ProtectedUserRoute><UserDetail /></ProtectedUserRoute> },
            { path: "about", element: <About /> },
            { path: "signup", element: <ProtectedLogoutRoute><Register /></ProtectedLogoutRoute> },
            { path: "signin", element: <ProtectedLogoutRoute><Login /></ProtectedLogoutRoute> },
            { path: "*", element: <PageNotFound /> },
          ],
        },
      ]);
      

  return (
    <RouterProvider router={router} />
  )
}

export default Router