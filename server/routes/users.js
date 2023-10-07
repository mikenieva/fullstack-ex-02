// 1. IMPORTACIONES
// A. LIBRERÍAS
import express from "express"
// B. ARCHIVOS
import usersController from "./../controllers/usersController.js"

// 2. INICIALIZADORES
const router = express.Router()

// 3. CONTROLADORES
router.get("/", usersController.readAll)

// 4. EXPORTACIÓN
export default router
