import pool from "../db.js";

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [productos] = await pool.query(
      "SELECT * FROM catalogo ORDER BY creado_en DESC"
    );
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener productos por categoría
export const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const [productos] = await pool.query(
      "SELECT * FROM catalogo WHERE categoria = ?",
      [categoria]
    );
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [productos] = await pool.query(
      "SELECT * FROM catalogo WHERE id_producto = ?",
      [id]
    );
    
    if (productos.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    res.json(productos[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, categoria, imagen, stock } = req.body;
    
    const [result] = await pool.query(
      "INSERT INTO catalogo (nombre, precio, descripcion, categoria, imagen, stock) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, precio, descripcion, categoria, imagen, stock || 0]
    );
    
    res.status(201).json({ 
      id_producto: result.insertId,
      mensaje: "Producto creado exitosamente" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria, imagen, stock } = req.body;
    
    const [result] = await pool.query(
      "UPDATE catalogo SET nombre = ?, precio = ?, descripcion = ?, categoria = ?, imagen = ?, stock = ? WHERE id_producto = ?",
      [nombre, precio, descripcion, categoria, imagen, stock, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    res.json({ mensaje: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar stock
export const actualizarStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    
    const [result] = await pool.query(
      "UPDATE catalogo SET stock = stock + ? WHERE id_producto = ?",
      [cantidad, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    res.json({ mensaje: "Stock actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      "DELETE FROM catalogo WHERE id_producto = ?",
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    
    res.json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};