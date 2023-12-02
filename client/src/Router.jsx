// ./src/Router.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import PizzasPage from "./pages/pizzas"
import PizzaState from "./context/Pizza/PizzaState"
import PizzaPage from "./pages/pizzas/pizza"
import Login from "./pages/iniciar-sesion"
import SignUp from "./pages/registro"
import UserState from "./context/User/UserState"

import Auth from "./routes/Auth"
import Public from "./routes/Public"
import Home from "./pages/home"

function Router() {
  return (
    <>
      <UserState>
        <PizzaState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Public component={Home} />} />
                <Route
                  path="/iniciar-sesion"
                  element={<Auth component={Login} />}
                />
                <Route path="/registro" element={<Auth component={SignUp} />} />
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
                  element={<Public component={PizzasPage} />}
                />
                <Route
                  path="/pizzas/:slug"
                  element={<Public component={PizzaPage} />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </PizzaState>
      </UserState>
    </>
  )
}

export default Router
