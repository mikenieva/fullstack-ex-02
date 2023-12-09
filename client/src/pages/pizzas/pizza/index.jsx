// ./src/pages/pizzas/pizza/index.jsx
import { Link, useParams } from "react-router-dom"
import priceFormatter from "../../../lib/priceFormatter"
import usePizza from "../../../hooks/usePizza"

function PizzaPage() {
  const params = useParams()
  const { slug } = params

  // CUSTOM HOOK
  const { authStatus, cart, pizza, localPrices, handleChange, handleSubmit } =
    usePizza(slug)

  const { _id, idStripe, name, currency, prices, img, description } = pizza

  // LOCALPRICES = {...PRICES, QUANTITY }
  console.log(localPrices)
  console.log(prices)

  const quantityOptions = [0, 1, 2, 3, 4, 5]

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Id MongoDB: {_id}</p>
        <p>Id Stripe: {idStripe}</p>

        <form onSubmit={handleSubmit}>
          <ul>
            {prices.length !== 0 ? (
              <>
                {localPrices.map((element) => {
                  console.log(element)
                  const { price, size, priceDescription } = element

                  return (
                    <>
                      <li>
                        <h2>Tipo de precio por tamaño: {size}</h2>
                        <p>
                          Precio: {priceFormatter(price)} {currency}{" "}
                        </p>

                        {authStatus ? (
                          <select
                            type="option"
                            name={`${element.id}`}
                            data-pizza-name={name}
                            data-pizza-size={size}
                            data-pizza-pricedescription={priceDescription}
                            data-pizza-price={price}
                            data-pizza-img={img[0]}
                            data-pizza-slug={slug}
                            onChange={(evt) => {
                              handleChange(evt)
                            }}
                          >
                            {quantityOptions.map((qo) => {
                              return (
                                <>
                                  {qo === element.quantity ? (
                                    <option selected value={qo}>
                                      {qo}
                                    </option>
                                  ) : (
                                    <option value={qo}>{qo}</option>
                                  )}
                                </>
                              )
                            })}
                          </select>
                        ) : null}
                      </li>
                    </>
                  )
                })}
              </>
            ) : (
              "No hay precios disponibles"
            )}
          </ul>
          {authStatus ? (
            <button type="submit">
              {cart.length !== 0 ? "Modificar carrito" : "Agregar al carrito"}
            </button>
          ) : (
            <Link to="/iniciar-sesion">
              <button>Crea tu carrito con tu sesión</button>
            </Link>
          )}
        </form>
      </div>
    </>
  )
}

export default PizzaPage
