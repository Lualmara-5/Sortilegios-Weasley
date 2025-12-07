import express from "express";
import * as resenaController from "../controllers/resenaController.js";

const router = express.Router();

router.get("/", resenaController.obtenerResenas);
router.get("/producto/:id_producto", resenaController.obtenerResenasPorProducto);
router.get("/producto/:id_producto/promedio", resenaController.obtenerPromedioCalificacion);
router.get("/usuario/:id_usuario", resenaController.obtenerResenasPorUsuario);
router.post("/", resenaController.crearResena);
router.put("/:id", resenaController.actualizarResena);
router.delete("/:id", resenaController.eliminarResena);

export default router;