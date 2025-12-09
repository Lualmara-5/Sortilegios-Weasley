import express from "express";
import * as pedidoController from "../controllers/pedido.js";

const router = express.Router();

router.get("/", pedidoController.obtenerPedidos);
router.get("/usuario/:id_usuario", pedidoController.obtenerPedidosPorUsuario);
router.get("/:id", pedidoController.obtenerPedidoPorId);
router.post("/", pedidoController.crearPedido);
router.patch("/:id/estado", pedidoController.actualizarEstadoPedido);
router.delete("/:id", pedidoController.eliminarPedido);

export default router;