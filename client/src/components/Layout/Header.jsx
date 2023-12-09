// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext, useEffect, useState } from "react"
import { Cart } from "react-bootstrap-icons"
import Navigation from "../Header/Nav"
import Button from "../Molecules/Button"
import NavBar from "../Header/NavBar"

function Header() {
  const data = [
    { name: "Inicio", href: "#" },
    { name: "Sobre nosotros", href: "#" },
  ]

  const [total, setTotal] = useState(0)

  const [user, setUser] = useState({
    name: "",
    lastname: "",
  })

  const userCtx = useContext(UserContext)

  const { cart, authStatus, currentUser, logoutUser, getCart } = userCtx

  console.log(cart)
  console.log(getCart)

  // USEEFFECT AUTENTICACIÓN
  useEffect(() => {
    if (currentUser) {
      const { name, lastname } = currentUser

      setUser({
        name,
        lastname,
      })
    }
  }, [currentUser])

  // USEEFFECT DE ACTUALIZACIÓN DE CARRITO
  useEffect(() => {
    const fetchCart = async () => {
      await getCart()
    }

    fetchCart()
  }, [currentUser])

  // USEEFFECT DE CÁLCULO DEL CARRITO
  useEffect(() => {
    const getTotalProducts = () => {
      const totalQty = cart.reduce((acc, cv) => {
        return acc + cv.quantity
      }, 0)
      return totalQty
    }

    const result = getTotalProducts()

    setTotal(result)
  }, [cart])

  return (
    <>
      <Navigation navigation={data} />
      <NavBar
        userAvatarUrl={
          "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        }
        totalItemsCart={total}
      />
      <div>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>

          {authStatus ? (
            <>
              <p>
                Te damos la bienvenida, {user.name} {user.lastname}
              </p>
              <Button
                message="Cerrar sesión"
                icon="logout"
                clickHandler={logoutUser}
              />

              <p style={{ textDecoration: "underline" }}>
                <Link to="/carrito">
                  <Cart style={{ marginRight: "8px" }} /> Tu carrito de compras:{" "}
                  <span>{total}</span>
                </Link>
              </p>
            </>
          ) : (
            <>
              <li>
                <Link to="/registro">Registro</Link>
              </li>
              <li>
                <Link to="/iniciar-sesion">Iniciar sesión</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default Header
