// ./src/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import PizzasPage from "./pages/pizzas"
import PizzaState from "./context/Pizza/PizzaState"
import PizzaPage from "./pages/pizzas/pizza"

function Router() {
  return (
    <>
      <PizzaState>
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
              <Route path="/pizzas" element={<PizzasPage />} />
              <Route path="/pizzas/:slug" element={<PizzaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PizzaState>
    </>
  )
}

export default Router
