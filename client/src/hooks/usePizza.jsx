// ./src/hooks/usePizza.js

import { useState, useEffect, useContext } from "react"
import PizzaContext from "../context/Pizza/PizzaContext"
import UserContext from "../context/User/UserContext"

// Definición del hook personalizado usePizza que recibe un slug como parámetro
export default function usePizza(slug) {
  // Utilizamos el hook useContext para acceder al contexto del usuario y de la pizza
  const userCtx = useContext(UserContext)
  const { authStatus, cart, editCart, getCart } = userCtx

  const pizzaCtx = useContext(PizzaContext)
  const { pizza, getPizza } = pizzaCtx

  // Definimos el estado inicial para el formulario y los precios locales
  const [form, setForm] = useState([])
  const [localPrices, setLocalPrices] = useState([])

  // Utilizamos el hook useEffect para realizar acciones al montar el componente
  useEffect(() => {
    // Definimos una función asíncrona para obtener el carrito
    const fetchCart = async () => {
      await getCart()
    }

    // Llamamos a la función para obtener el carrito y obtener la pizza por su slug
    fetchCart()
    getPizza(slug)
  }, [])

  // Utilizamos otro hook useEffect para realizar acciones cuando cambia el precio de la pizza
  useEffect(() => {
    // Si el id de la pizza es null, no hacemos nada
    if (pizza.id === null) {
      return null
    }

    // Actualizamos los precios locales basándonos en los precios de la pizza
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

    // Actualizamos el estado con los precios actualizados y el carrito
    setLocalPrices([...updatedPrices])
    setForm([...cart])
  }, [pizza.prices])

  // Definimos la función handleChange para manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    // Si el valor del input es "0", filtramos el formulario para eliminar el elemento con el priceID correspondiente
    if (e.target.value === "0") {
      const filteredData = form.filter((element) => {
        return element.priceID !== e.target.name
      })

      return setForm(filteredData)
    }

    // Creamos un nuevo objeto con los datos del input
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

    // Buscamos el elemento en el formulario con el mismo priceID
    const filteredData = form.findIndex((element) => {
      return element.priceID === e.target.name
    })

    // Si no encontramos el elemento, añadimos el nuevo dato al formulario
    if (filteredData === -1) {
      return setForm([...form, newData])
    }

    // Si encontramos el elemento, lo actualizamos con los nuevos datos
    const updatedData = form.map((elt) => {
      return elt.priceID === e.target.name ? newData : elt
    })

    // Actualizamos el estado del formulario con los datos actualizados
    return setForm(updatedData)
  }

  // Definimos la función handleSubmit para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    await editCart(form)
  }

  // Retornamos los valores que queremos exponer a los componentes que utilicen este hook
  return {
    authStatus,
    cart,
    pizza,
    form,
    localPrices,
    handleChange,
    handleSubmit,
  }
}
