// ./src/routes/Auth.jsx
// Este archivos nos servirá para confirmar si el usuario está autenticado o no

import { useContext, useEffect } from "react"
import { Navigate } from "react-router-dom"
import UserContext from "../context/User/UserContext"

// HOCs
// High Order Components
// Componentes que incluyen otros componentes dentro de sí mismo, evaluando algo antes de renderizar.

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ component: Component }) => {
  // 1. OBTENER LOS DATOS DE USUARIO
  // SABER SI EL USUARIO ESTÁ AUTENTICADO O NO, CON AUTHSTATUS
  const userCtx = useContext(UserContext)
  const { authStatus, verifyingToken } = userCtx

  // 2. HOOK DE EFECTO
  // VERIFICARÁ DE INICIO Y CUANDO HAYA UN CAMBIO EN AUTHSTATUS SI EL USUARIO TUVO MODIFICACIONES EN SU SESIÓN, Y SI SÍ, EJECUTARÁ EL VERIFYINGT TOKEN
  useEffect(() => {
    verifyingToken()
  }, [authStatus])

  // 3. GENERACIÓN DE COMPONENTE

  return <>{authStatus ? <Navigate replace to="/" /> : <Component />}</>
}

export default AuthRoute
