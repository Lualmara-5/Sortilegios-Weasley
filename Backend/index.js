import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

// Importar rutas
import usuarioRoutes from "./routes/usuario.js";
import catalogoRoutes from "./routes/catalogo.js";
import pedidoRoutes from "./routes/pedido.js";
import resenaRoutes from "./routes/resena.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------
//  Middlewares
// ----------------------------
app.use(cors());
app.use(express.json());

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD ? "OK" : "EMPTY",
  db: process.env.DB_NAME,
});


// ----------------------------
//  Probar conexión a MySQL
// ----------------------------
async function probarConexion() {
  try {
    const conn = await pool.getConnection();
    console.log("Conexión a MySQL en Railway exitosa! 🚀");
    conn.release();
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error.message);
  }
}

probarConexion();

// ----------------------------
//  Ruta raíz
// ----------------------------
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// ----------------------------
//  Test de base de datos
// ----------------------------
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.json({
      message: "Conexión exitosa a la base de datos 🎉",
      data: rows,
    });
  } catch (error) {
    console.error("❌ Error test-db:", error);
    res.status(500).json({ error: "Error al conectar a la base de datos" });
  }
});

// ----------------------------
//  Rutas API
// ----------------------------
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/catalogo", catalogoRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/resenas", resenaRoutes);

// ----------------------------
//  Iniciar servidor
// ----------------------------
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
