// ./src/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <p>Este es el home</p>
                </>
              }
            />

            <Route
              path="/iniciar-sesion"
              element={
                <>
                  <p>Está página es iniciar sesión</p>
                </>
              }
            />
            <Route
              path="/registro"
              element={
                <>
                  <p>Está página es registro de usuario</p>
                </>
              }
            />
            <Route
              path="/perfil"
              element={
                <>
                  <p>Está página es mi perfil de usuario</p>
                </>
              }
            />
            <Route
              path="/carrito"
              element={
                <>
                  <p>Está página es el carrito de compras</p>
                </>
              }
            />
            <Route
              path="/pizzas"
              element={
                <>
                  <p>Este es el listado de pizzas</p>
                </>
              }
            />
            <Route
              path="/pizzas/:slug"
              element={
                <>
                  <p>Esta es una pizza individual</p>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
