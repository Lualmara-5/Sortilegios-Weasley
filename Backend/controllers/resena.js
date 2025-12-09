import pool from "../db.js";

// Obtener todas las reseñas
export const obtenerResenas = async (req, res) => {
  try {
    const [resenas] = await pool.query(`
      SELECT r.*, u.nickname, c.nombre as producto_nombre
      FROM resena r
      LEFT JOIN usuario u ON r.id_usuario = u.id_usuario
      LEFT JOIN catalogo c ON r.id_producto = c.id_producto
      ORDER BY r.fecha DESC
    `);
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener reseñas por producto
export const obtenerResenasPorProducto = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const [resenas] = await pool.query(`
      SELECT r.*, u.nickname
      FROM resena r
      LEFT JOIN usuario u ON r.id_usuario = u.id_usuario
      WHERE r.id_producto = ?
      ORDER BY r.fecha DESC
    `, [id_producto]);
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener reseñas por usuario
export const obtenerResenasPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [resenas] = await pool.query(`
      SELECT r.*, c.nombre as producto_nombre, c.imagen
      FROM resena r
      LEFT JOIN catalogo c ON r.id_producto = c.id_producto
      WHERE r.id_usuario = ?
      ORDER BY r.fecha DESC
    `, [id_usuario]);
    res.json(resenas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear reseña
export const crearResena = async (req, res) => {
  try {
    const { id_usuario, id_producto, calificacion, comentario } = req.body;
    
    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: "La calificación debe estar entre 1 y 5" });
    }
    
    const [result] = await pool.query(
      "INSERT INTO resena (id_usuario, id_producto, calificacion, comentario) VALUES (?, ?, ?, ?)",
      [id_usuario, id_producto, calificacion, comentario]
    );
    
    res.status(201).json({ 
      id_resena: result.insertId,
      mensaje: "Reseña creada exitosamente" 
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: "Ya has reseñado este producto" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Actualizar reseña
export const actualizarResena = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacion, comentario } = req.body;
    
    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: "La calificación debe estar entre 1 y 5" });
    }
    
    const [result] = await pool.query(
      "UPDATE resena SET calificacion = ?, comentario = ? WHERE id_resena = ?",
      [calificacion, comentario, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    
    res.json({ mensaje: "Reseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar reseña
export const eliminarResena = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      "DELETE FROM resena WHERE id_resena = ?",
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }
    
    res.json({ mensaje: "Reseña eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener promedio de calificaciones de un producto
export const obtenerPromedioCalificacion = async (req, res) => {
  try {
    const { id_producto } = req.params;
    const [result] = await pool.query(
      "SELECT AVG(calificacion) as promedio, COUNT(*) as total FROM resena WHERE id_producto = ?",
      [id_producto]
    );
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};