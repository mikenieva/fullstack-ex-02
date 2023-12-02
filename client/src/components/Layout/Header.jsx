// ./src/components/Layout/Header.jsx
import { Link } from "react-router-dom"

function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/registro">Registro</Link>
        </li>
        <li>
          <Link to="/iniciar-sesion">Iniciar sesión</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header
