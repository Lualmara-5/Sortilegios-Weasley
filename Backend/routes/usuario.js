import express from "express";
import * as usuarioController from "../controllers/usuario.js";
import pool from "../db.js";

const router = express.Router();

router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.post("/", usuarioController.crearUsuario);
router.put("/:id", usuarioController.actualizarUsuario);
router.delete("/:id", usuarioController.eliminarUsuario);

export default router;