import express from "express";
import * as usuarioController from "../controllers/usuario.js";

const router = express.Router();

router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/", usuarioController.crearUsuario);
router.post("/login", usuarioController.loginUsuario);
router.put("/:id", usuarioController.actualizarUsuario);
router.delete("/:id", usuarioController.eliminarUsuario);

export default router;