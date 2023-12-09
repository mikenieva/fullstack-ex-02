// ./src/pages/pizzas/pizza/index.jsx

import { Link, useParams } from "react-router-dom"
import priceFormatter from "../../../lib/priceFormatter"
import usePizza from "../../../hooks/usePizza"

function PizzaPage() {
  const params = useParams()
  const { slug } = params

  const { authStatus, cart, pizza, localPrices, handleChange, handleSubmit } =
    usePizza(slug)

  const { _id, idStripe, name, currency, prices, img, description } = pizza

  const quantityOptions = [0, 1, 2, 3, 4, 5]

  return (
    <>
      <div>
        <img src={img[0]} />
        <h1>{name}</h1>
        <p>{description}</p>
        <p>Id MongoDB: {_id}</p>
        <p>Id Stripe: {idStripe}</p>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
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
                          <>
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
                              {quantityOptions.map((elt) => {
                                return (
                                  <>
                                    {elt === element.quantity ? (
                                      <option selected value={elt}>
                                        {elt}
                                      </option>
                                    ) : (
                                      <option value={elt}>{elt}</option>
                                    )}
                                  </>
                                )
                              })}
                            </select>
                          </>
                        ) : (
                          <Link to="/iniciar-sesion">
                            <button>Crea tu carrito con tu sesión</button>
                          </Link>
                        )}
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
            <button type="submit" className="btn-product">
              {cart.length !== 0 ? "Modificar carrito" : "Agregar al carrito"}
            </button>
          ) : (
            <Link to="/registro">
              <button type="submit" className="btn-product">
                Regístrate para crear un carrito
              </button>
            </Link>
          )}
        </form>
      </div>
    </>
  )
}

export default PizzaPage
