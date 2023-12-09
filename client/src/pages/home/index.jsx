// ./src/pages/home/index.jsx

import { Link } from "react-router-dom"
import { useQuery } from "../../hooks/useQuery"
import { useEffect } from "react"

import toast from "react-hot-toast"



function Home() {
  const query = useQuery()
  console.log(query)

  const status = query.get("status")
  console.log(status)

  useEffect(() => {
    if(status === "successful") 

  }, [status])

  return (
    <div>
      <ul>
        <li>
          <Link to="/pizzas">Ir a las pizzas</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
