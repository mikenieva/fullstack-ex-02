import { useState, useEffect, useContext } from "react"

import UserContext from "../../context/User/UserContext"

export default function Cart() {
  const userCtx = useContext(UserContext)

  const { cart, sessionURL, getCheckoutSession, editCart } = userCtx
  const [total, setTotal] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    getCheckoutSession()
  }

  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL
  }, [sessionURL])

  useEffect(() => {
    const reduceTotalFromOrder = () => {
      return cart.reduce((acc, cv) => {
        const updatedQuantity = (cv.price / 100) * cv.quantity
        return updatedQuantity + acc
      }, 0)
    }

    const getOrderDetails = () => {
      const total = reduceTotalFromOrder()
      setTotal(total)
    }

    getOrderDetails()
  }, [cart])

  const handleChange = (e) => {
    const updatedCart = cart.map((elt) => {
      return elt.priceID === e.target.name
        ? {
            ...elt,
            quantity: parseInt(e.target.value),
          }
        : elt
    })

    editCart(updatedCart)
  }

  const handleRemove = (e, currentPriceID) => {
    e.preventDefault()

    const updatedCart = cart.filter((elt) => {
      return elt.priceID !== currentPriceID
    })

    editCart(updatedCart)
  }

  return (
    <div>
      <div>
        Tu carrito de compras:
        <ul>
          {cart.map((e) => {
            return (
              <li key={e.id}>
                <h3>{e.name}</h3>
                <p>{e.size}</p>
                <p> ${((e.price / 100) * e.quantity).toFixed(2)}</p>
                <select
                  id="quantity-0"
                  name={e.priceID}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  {Array(5)
                    .fill(null)
                    .map((_, i) => {
                      const initial = i + 1

                      return initial === e.quantity ? (
                        <option selected value={initial}>
                          {initial}
                        </option>
                      ) : (
                        <option value={initial}>{initial}</option>
                      )
                    })}
                </select>
                <button
                  type="button"
                  onClick={(evt) => {
                    handleRemove(evt, e.priceID)
                  }}
                >
                  <span>Eliminar</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div>
          <p>Total</p>
          <p>$ {total.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <button
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          Procesar pago
        </button>
      </div>
    </div>
  )
}
