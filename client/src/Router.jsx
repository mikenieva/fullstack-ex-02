// ./src/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import PizzasPage from "./pages/pizzas"
import PizzaState from "./context/Pizza/PizzaState"
import PizzaPage from "./pages/pizzas/pizza"
import Login from "./pages/iniciar-sesion"
import SignUp from "./pages/registro"
import UserState from "./context/User/UserState"

function Router() {
  return (
    <>
      <UserState>
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

                <Route path="/iniciar-sesion" element={<Login />} />
                <Route path="/registro" element={<SignUp />} />
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
      </UserState>
    </>
  )
}

export default Router
