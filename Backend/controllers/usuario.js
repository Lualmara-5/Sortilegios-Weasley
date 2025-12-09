import pool from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      "SELECT id_usuario, nickname, mail, foto, direccion, ciudad, estado, codigo_postal, cf_pedidos, creado_en FROM usuario"
    );
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [usuarios] = await pool.query(
      "SELECT id_usuario, nickname, mail, foto, direccion, ciudad, estado, codigo_postal, cf_pedidos, creado_en FROM usuario WHERE id_usuario = ?",
      [id]
    );
    
    if (usuarios.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.json(usuarios[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear usuario o registro
export const crearUsuario = async (req, res) => {
  try {
    const { nickname, mail, password, foto, direccion, ciudad, estado, punto_referencia, codigo_postal } = req.body;

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO usuario (nickname, mail, password, foto, direccion, ciudad, estado, punto_referencia, codigo_postal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nickname, mail, hashedPassword, foto, direccion, ciudad, estado, punto_referencia, codigo_postal]
    );
    
    res.status(201).json({ 
      id_usuario: result.insertId,
      mensaje: "Usuario creado exitosamente" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname, mail, foto, direccion, ciudad, estado, punto_referencia, codigo_postal } = req.body;
    
    const [result] = await pool.query(
      "UPDATE usuario SET nickname = ?, mail = ?, foto = ?, direccion = ?, ciudad = ?, estado = ?, punto_referencia = ?, codigo_postal = ? WHERE id_usuario = ?",
      [nickname, mail, foto, direccion, ciudad, estado, punto_referencia, codigo_postal, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.json({ mensaje: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      "DELETE FROM usuario WHERE id_usuario = ?",
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    res.json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Buscar usuario por email
    const [usuarios] = await pool.query(
      "SELECT id_usuario, nickname, mail, password FROM usuario WHERE mail = ?",
      [mail]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    const usuario = usuarios[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, nickname: usuario.nickname },
      process.env.JWT_SECRET || "mi_clave_secreta",
      { expiresIn: "1d" }
    );

    res.json({ token, usuario: { id_usuario: usuario.id_usuario, nickname: usuario.nickname, mail: usuario.mail } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
