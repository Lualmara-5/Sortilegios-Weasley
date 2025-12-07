import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importar rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import catalogoRoutes from "./routes/catalogoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import resenaRoutes from "./routes/resenaRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/catalogo", catalogoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/resenas", resenaRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API de Sortilegios Weasley funcionando 🚀" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});