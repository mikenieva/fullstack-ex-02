// ./src/pages/pizzas/pizza/index.jsx

import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useContext } from "react"
import PizzaContext from "../../../context/Pizza/PizzaContext"
import priceFormatter from "../../../lib/priceFormatter"

function PizzaPage() {
  const params = useParams()
  console.log(params)
  const { slug } = params

  const pizzaCtx = useContext(PizzaContext)
  const { pizza, getPizza } = pizzaCtx
  console.log(pizza)

  const { _id, idStripe, name, currency, prices, img, description } = pizza

  useEffect(() => {
    getPizza(slug)
  }, [])

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Id MongoDB: {_id}</p>
        <p>Id Stripe: {idStripe}</p>
        <ul>
          {prices.length !== 0 ? (
            <>
              {prices.map((element) => {
                console.log(element)
                const { price, size } = element

                return (
                  <>
                    <li>
                      <h2>Tipo de precio por tamaño: {size}</h2>
                      <p>
                        Precio: {priceFormatter(price)} {currency}{" "}
                      </p>
                    </li>
                  </>
                )
              })}
            </>
          ) : (
            "No hay precios disponibles"
          )}
        </ul>
      </div>
    </>
  )
}

export default PizzaPage
