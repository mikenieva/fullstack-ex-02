// ./src/pages/pizzas/index.jsx
import { useContext, useEffect } from "react"
import PizzaContext from "../../context/Pizza/PizzaContext"

function PizzasPage() {
  // TRAERME LOS DATOS DE LAS PIZZAS DEL SERVER
  const pizzaCtx = useContext(PizzaContext)

  const { pizzas, getPizzas } = pizzaCtx

  useEffect(() => {
    getPizzas()
  }, [])

  console.log(pizzaCtx)

  return (
    <>
      <div>
        <ul>
          {pizzas.length !== 0
            ? pizzas.map((pizza, i) => {
                const { name } = pizza

                return <li key={i}>{name}</li>
              })
            : "No hay pizzas disponibles"}
        </ul>
      </div>
    </>
  )
}

export default PizzasPage
