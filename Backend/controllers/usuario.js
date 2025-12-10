// Backend/controllers/usuario.js
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = '8h';

// Obtener todos los usuarios (sin contraseña)
export async function obtenerUsuarios(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT id_usuario, nickname, mail, rol AS role, creado_en FROM usuario'
    );

    // Normalizar: si no hay rol, dejar "user"
    const usuarios = rows.map(u => ({
      ...u,
      role: u.role || 'user'
    }));

    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
}

// Obtener usuario por id
export async function obtenerUsuarioPorId(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT id_usuario, nickname, mail, rol AS role, creado_en FROM usuario WHERE id_usuario = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = rows[0];
    const role = user.role || 'user';

    res.json({
      ...user,
      role
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
}

// Crear usuario
export async function crearUsuario(req, res) {
  try {
    const { nickname, mail, password, rol } = req.body;

    if (!nickname || !mail || !password) {
      return res.status(400).json({ message: 'nickname, mail y password son obligatorios' });
    }

    // Verificar si ya existe el mail
    const [existentes] = await pool.query(
      'SELECT id_usuario FROM usuario WHERE mail = ?',
      [mail]
    );
    if (existentes.length > 0) {
      return res.status(409).json({ message: 'El mail ya está registrado' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const roleValue = rol || 'user';

    const [result] = await pool.query(
      'INSERT INTO usuario (nickname, mail, password, rol) VALUES (?, ?, ?, ?)',
      [nickname, mail, hashed, roleValue]
    );

    res.status(201).json({
      id_usuario: result.insertId,
      nickname,
      mail,
      role: roleValue
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
}

// Login de usuario
export async function loginUsuario(req, res) {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ message: 'mail y password son obligatorios' });
    }

    const [rows] = await pool.query(
      'SELECT id_usuario, nickname, mail, password, rol FROM usuario WHERE mail = ?',
      [mail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = rows[0];
    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const role = user.rol || 'user';

    const payload = {
      id_usuario: user.id_usuario,
      nickname: user.nickname,
      mail: user.mail,
      role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({
      ...payload,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en login' });
  }
}

// Actualizar usuario (simplificado)
export async function actualizarUsuario(req, res) {
  const { id } = req.params;
  const { nickname, mail, rol } = req.body;

  try {
    const [rows] = await pool.query(
      'UPDATE usuario SET nickname = COALESCE(?, nickname), mail = COALESCE(?, mail), rol = COALESCE(?, rol) WHERE id_usuario = ?',
      [nickname, mail, rol, id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
}

// Eliminar usuario
export async function eliminarUsuario(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      'DELETE FROM usuario WHERE id_usuario = ?',
      [id]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
}