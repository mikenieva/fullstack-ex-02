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
import Private from "./routes/Private"
import Home from "./pages/home"
import Cart from "./pages/carrito"

import { CartProvider } from "react-use-cart"

function Router() {
  return (
    <>
      <CartProvider>
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
                  <Route
                    path="/registro"
                    element={<Auth component={SignUp} />}
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
                    element={<Private component={Cart} />}
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
      </CartProvider>
    </>
  )
}

export default Router
