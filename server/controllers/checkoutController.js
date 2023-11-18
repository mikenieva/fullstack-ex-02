// import Cart from "../models/Cart"

// IMPORTAR STRIPE Y CONFIGURAR CLAVE DE STRIPE
import stripe from "stripe"
import dotenv from "dotenv"
import User from "./../models/User.js"
import Cart from "./../models/Cart.js"

dotenv.config()

const stripeKey = stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
  console.log("accediste...")

  // 1. OBTENER EL USUARIO Y SU ID CON CORREO

  const user = {
    id: "123",
    email: "m@mikenieva.com",
  }

  // 2. CREACIÓN DEL CARRITO DE COMPRAS O OBTENCIÓN DEL USUARIO

  // 3. CREACIÓN DE CHECKOUT EN STRIPE

  const line_items = [
    {
      price: "price_1O8pBDCl7xMuNYvuspXlFIcZ",
      quantity: 1,
    },
  ]

  console.log(stripeKey)

  try {
    const session = await stripeKey.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "https://google.com",
      cancel_url: "https://yahoo.com",
      customer_email: user.email,
    })
    console.log("session", session)

    res.status(200).json({
      msg: "Accede a este link para la sesión de pago",
      session_url: session.url,
      session,
    })
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      msg: "Hubo un problema",
      error,
    })
  }
}

// CREAR ORDEN
// SE VA A RECIBIR UNA PETICIÓN POR STRIPE (NO POR THUNDERCLIENT) EL CUAL VA A INCLUIR
// TODOS LOS DATOS DE LA ORDEN QUE HIZO EL USUARIO (YA LO PAGÓ) Y NOSOTROS
// VAMOS A GENERAR EN BASE DE DATOS SU RECIBO.
const createOrder = async (req, res) => {
  // 1. OBTENER LA FIRMA DE STRIPE SECRETA WEBHOOKS
  // (SIEMPRE ES ASÍ)

  // TODO: EVALUAR LA FIRMA DE SEGURIDAD CON WEBHOOKS
  const sig = req.headers["stripe-signature"]
  const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET
  console.log(req.body)
  console.log(sig)
  console.log(endpointSecret)

  // let event

  // 2. VERIFICACIÓN DEL EVENTO DE STRIPE (VERIFICAR QUE SÍ ES STRIPE Y NO UN ATACANTE)
  try {
    event = stripeKey.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      msg: error,
    })
    return
  }

  // 3. EVALUAR EL EVENTO
  // A. SI EL PAGO EXITOSO, OBTENER EL INVOICE ( EL RECIBO)

  console.log("req.body.data", req.body.data)
  console.log("req.body.object", req.body.data.object)

  let event = req.body.type // "charge.succeeded"

  try {
    switch (event) {
      // SI EL PAGO SE EJECUTÓ CORRECTAMENTE
      case "charge.succeeded":
        const paymentIntent = req.body.data.object

        // PULIR DATOS PARA ENTREGA A BD
        const email = paymentIntent.billing_details.email
        const receiptURL = paymentIntent.receipt_url
        const receiptID = receiptURL
          .split("/")
          .filter((item) => item)
          .pop()
        const amount = paymentIntent.amount
        const date_created = paymentIntent.created

        console.log("email", email)
        console.log("receiptURL", receiptURL)
        console.log("receiptID", receiptID)
        console.log("amount", amount)
        console.log("data_created", date_created)

        // GUARDAR EN BASE DE DATOS
        const paymentDB = await User.findOneAndUpdate(
          {
            email,
          },
          {
            $push: {
              receipts: {
                receiptURL,
                receiptID,
                date_created,
                amount,
              },
            },
          },
          { new: true }
        )

        console.log("paymentDB", paymentDB)

        break

      default:
        console.log("Evento no encontrado")

        res.status(200).json({
          msg: "Evento no encontrado.",
        })
    }
  } catch (error) {
    console.log("error", error)
    res.status(400).json({
      msg: error,
    })
  }

  // ACTUALIZAR A BASE DE DATOS
  //B. SI EL PAGO FUE FALLIDO, REGRESAR UN MENSAJE DE ERROR
}

const editCart = async (req, res) => {
  console.log(req.user)
  console.log(req.body)
  // OBTENER EL ID DEL USUARIO
  const userID = req.user.id

  try {
    // ENCONTRAR EL USUARIO EN BASE DE DATOS
    console.log(userID)
    const foundUser = await User.findById(userID).lean()

    // OBTENER EL LISTADO DE PRODUCTOS CON DATOS
    const { products } = req.body

    // ACTUALIZAR EL CARRITO
    const updatedCart = await Cart.findByIdAndUpdate(
      foundUser.cart,
      { products },
      { new: true }
    )

    res.status(200).json({
      msg: "Carrito actualizado",
      updatedCart,
    })
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.status(500).json({
      msg: "Hubo un error en servidor",
      error,
    })
  }
}

export default {
  createOrder,
  createCheckoutSession,
  editCart,
}
