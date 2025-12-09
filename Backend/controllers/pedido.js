import pool from "../db.js";

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const [pedidos] = await pool.query(`
      SELECT p.*, u.nickname, u.mail 
      FROM pedido p
      LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
      ORDER BY p.fecha DESC
    `);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener pedidos por usuario
export const obtenerPedidosPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const [pedidos] = await pool.query(
      "SELECT * FROM pedido WHERE id_usuario = ? ORDER BY fecha DESC",
      [id_usuario]
    );
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un pedido por ID
export const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [pedidos] = await pool.query(`
      SELECT p.*, u.nickname, u.mail 
      FROM pedido p
      LEFT JOIN usuario u ON p.id_usuario = u.id_usuario
      WHERE p.id_pedido = ?
    `, [id]);
    
    if (pedidos.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    
    res.json(pedidos[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const { 
      id_usuario, 
      metodo_pago, 
      total,
      direccion_entrega,
      ciudad_entrega,
      estado_entrega,
      punto_referencia_entrega,
      codigo_postal_entrega,
      observaciones 
    } = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO pedido 
       (id_usuario, metodo_pago, total, direccion_entrega, ciudad_entrega, estado_entrega, punto_referencia_entrega, codigo_postal_entrega, observaciones) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_usuario, metodo_pago, total, direccion_entrega, ciudad_entrega, estado_entrega, punto_referencia_entrega, codigo_postal_entrega, observaciones]
    );
    
    // Actualizar contador de pedidos del usuario
    await pool.query(
      "UPDATE usuario SET cf_pedidos = cf_pedidos + 1 WHERE id_usuario = ?",
      [id_usuario]
    );
    
    res.status(201).json({ 
      id_pedido: result.insertId,
      mensaje: "Pedido creado exitosamente" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar estado del pedido
export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    const estadosValidos = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];
    
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }
    
    const [result] = await pool.query(
      "UPDATE pedido SET estado = ? WHERE id_pedido = ?",
      [estado, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    
    res.json({ mensaje: "Estado actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar pedido
export const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      "DELETE FROM pedido WHERE id_pedido = ?",
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }
    
    res.json({ mensaje: "Pedido eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};