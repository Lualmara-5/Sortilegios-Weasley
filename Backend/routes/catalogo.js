import express from "express";
import * as catalogoController from "../controllers/catalogoController.js";

const router = express.Router();

router.get("/", catalogoController.obtenerProductos);
router.get("/categoria/:categoria", catalogoController.obtenerProductosPorCategoria);
router.get("/:id", catalogoController.obtenerProductoPorId);
router.post("/", catalogoController.crearProducto);
router.put("/:id", catalogoController.actualizarProducto);
router.patch("/:id/stock", catalogoController.actualizarStock);
router.delete("/:id", catalogoController.eliminarProducto);

export default router;