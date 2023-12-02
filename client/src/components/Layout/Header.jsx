// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"
import UserContext from "../../context/User/UserContext"
import { useContext } from "react"

function Header() {
  const userCtx = useContext(UserContext)

  const { authStatus, logoutUser } = userCtx

  console.log(logoutUser)

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>

        {authStatus ? (
          <>
            <p>Usuario loggeado</p>
            <button onClick={logoutUser}>
              <Link to="/">Cerrar sesión</Link>
            </button>
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
