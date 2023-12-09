// ./src/pages/pizzas/pizza/index.jsx

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { useContext } from "react"
import PizzaContext from "../../../context/Pizza/PizzaContext"
import priceFormatter from "../../../lib/priceFormatter"

import UserContext from "../../../context/User/UserContext"

function PizzaPage() {
  const userCtx = useContext(UserContext)
  const [form, setForm] = useState([])

  const { authStatus, cart, editCart, getCart } = userCtx
  console.log(cart)
  console.log(editCart)
  console.log(getCart)

  const params = useParams()
  console.log(params)
  const { slug } = params

  const pizzaCtx = useContext(PizzaContext)
  const { pizza, getPizza } = pizzaCtx
  console.log(pizza)

  const { _id, idStripe, name, currency, prices, img, description } = pizza

  const [localPrices, setLocalPrices] = useState([])
  console.log(localPrices)

  useEffect(() => {
    const fetchCart = async () => {
      await getCart()
    }

    fetchCart()

    getPizza(slug)
  }, [])

  useEffect(() => {
    if (pizza.id === null) {
      return null
    }

    const updatedPrices = pizza.prices.map((firstElement) => {
      let comparisonCart = cart.filter((secondElement) => {
        return firstElement.id === secondElement.priceID
      })

      const [cartQuantity] = comparisonCart

      return {
        ...firstElement,
        quantity: cartQuantity ? cartQuantity.quantity : 0,
      }
    })

    console.log(updatedPrices)
    console.log(cart)
    setLocalPrices([...updatedPrices])

    setForm([...cart])
  }, [prices])

  const handleChange = (e) => {
    if (e.target.value === "0") {
      const filteredData = form.filter((element) => {
        return element.priceID !== e.target.name
      })

      return setForm(filteredData)
    }

    const newData = {
      priceID: e.target.name,
      priceDescription: e.target.getAttribute("data-pizza-pricedescription"),
      size: e.target.getAttribute("data-pizza-size"),
      name: e.target.getAttribute("data-pizza-name"),
      quantity: e.target.value,
      price: e.target.getAttribute("data-pizza-price"),
      img: e.target.getAttribute("data-pizza-img"),
      slug: e.target.getAttribute("data-pizza-slug"),
    }

    const filteredData = form.findIndex((element) => {
      return element.priceID === e.target.name
    })

    if (filteredData === -1) {
      return setForm([...form, newData])
    }

    const updatedData = form.map((elt) => {
      return elt.priceID === e.target.name ? newData : elt
    })

    return setForm(updatedData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await editCart(form)
  }

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
                              onChange={(evt) => {
                                handleChange(evt)
                              }}
                            >
                              {quantityOptions.map((elt) => {
                                console.log(elt)
                                return (
                                  <>
                                    <option value={elt}>{elt}</option>
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
