// 1. IMPORTACIONES
// A. LIBRERÍAS
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

// B. ARCHIVOS
import userRoute from "./routes/users.js"
import carRoute from "./routes/cars.js"

// 2. INICIALIZADORES
const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const port = process.env.BASE_URL_PORT || 3005

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación sobre usuarios en Ucamp",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

// 3. RUTAS

// A. APLICACIÓN
// PROD: https://midominio.com/
// DEV: localhost:3005/
app.use("/api/v1/users", userRoute)
app.use("/api/v1/cars", carRoute)

// B. DOCUMENTACIÓN
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// 4. LEVANTAMIENTO DEL SERVIDOR
app.listen(port, () => console.log("Servidor está activo."))
