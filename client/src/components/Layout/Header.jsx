// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext, useEffect, useState } from "react"
import { Cart } from "react-bootstrap-icons"

function Header() {
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
            <button onClick={logoutUser}>
              <Link to="/">Cerrar sesión</Link>
            </button>
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
  )
}

export default Header
