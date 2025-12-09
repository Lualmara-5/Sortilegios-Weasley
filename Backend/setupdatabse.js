import pool from './db.js';
import dotenv from 'dotenv'

dotenv.config();

// ==================================================
// SCRIPT PARA CREAR TABLAS E INGESTAR DATOS
// ==================================================

async function setupDatabase() {
  console.log('🚀 Iniciando setup de la base de datos...\n');

  try {

    // 1. ELIMINAR TABLAS EXISTENTES (en orden correcto)
    console.log('Limpiando tablas existentes...');
    await pool.query('DROP TABLE IF EXISTS resena');
    await pool.query('DROP TABLE IF EXISTS pedido');
    await pool.query('DROP TABLE IF EXISTS catalogo');
    await pool.query('DROP TABLE IF EXISTS usuario');
    console.log('Tablas eliminadas\n');

    // 2. CREAR TABLA USUARIO
    console.log('Creando tabla usuario...');
    await pool.query(`
      CREATE TABLE usuario (
        id_usuario INT AUTO_INCREMENT PRIMARY KEY,
        nickname VARCHAR(50) NOT NULL,
        mail VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        foto VARCHAR(255),
        direccion VARCHAR(255),
        ciudad VARCHAR(100),
        estado VARCHAR(100),
        punto_referencia VARCHAR(255),
        codigo_postal VARCHAR(20),
        cf_pedidos INT DEFAULT 0,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_mail (mail),
        INDEX idx_nickname (nickname)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('Tabla usuario creada\n');

    // 3. CREAR TABLA CATALOGO
    console.log('Creando tabla catalogo...');
    await pool.query(`
      CREATE TABLE catalogo (
        id_producto INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
        descripcion TEXT,
        categoria VARCHAR(100),
        imagen VARCHAR(255),
        stock INT DEFAULT 0 CHECK (stock >= 0),
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_categoria (categoria),
        INDEX idx_nombre (nombre)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('Tabla catalogo creada\n');

    // 4. CREAR TABLA PEDIDO
    console.log('Creando tabla pedido...');
    await pool.query(`
      CREATE TABLE pedido (
        id_pedido INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        estado ENUM('pendiente','pagado','enviado','entregado','cancelado') DEFAULT 'pendiente',
        metodo_pago VARCHAR(50),
        total DECIMAL(12,2) DEFAULT 0.00 CHECK (total >= 0),
        direccion_entrega VARCHAR(255),
        ciudad_entrega VARCHAR(100),
        estado_entrega VARCHAR(100),
        punto_referencia_entrega VARCHAR(255),
        codigo_postal_entrega VARCHAR(20),
        observaciones TEXT,
        actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
          ON DELETE CASCADE ON UPDATE CASCADE,
        INDEX idx_usuario (id_usuario),
        INDEX idx_fecha (fecha),
        INDEX idx_estado (estado)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('Tabla pedido creada\n');

    // 5. CREAR TABLA RESENA
    console.log('Creando tabla resena...');
    await pool.query(`
      CREATE TABLE resena (
        id_resena INT AUTO_INCREMENT PRIMARY KEY,
        calificacion TINYINT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
        comentario TEXT,
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        id_usuario INT NOT NULL,
        id_producto INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
          ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_producto) REFERENCES catalogo(id_producto)
          ON DELETE CASCADE ON UPDATE CASCADE,
        INDEX idx_producto (id_producto),
        INDEX idx_usuario (id_usuario),
        INDEX idx_calificacion (calificacion),
        UNIQUE KEY unique_user_product_review (id_usuario, id_producto)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('Tabla resena creada\n');

    // 6. INSERTAR DATOS DE EJEMPLO
    console.log('Insertando datos de ejemplo...\n');

    // Usuarios
    console.log('Insertando usuarios...');
    const usuarios = [
      ['harry_potter', 'harry@hogwarts.com', '$2a$10$abcdefghijklmnopqrstuv', 'https://i.pravatar.cc/150?img=1', 'Privet Drive 4', 'Little Whinging', 'Surrey', 'Debajo de la escalera', 'KT12 8PE'],
      ['hermione_g', 'hermione@hogwarts.com', '$2a$10$abcdefghijklmnopqrstuv', 'https://i.pravatar.cc/150?img=2', 'Willow Lane 27', 'Londres', 'Inglaterra', 'Casa muggle', 'SW1A 1AA'],
      ['ron_weasley', 'ron@hogwarts.com', '$2a$10$abcdefghijklmnopqrstuv', 'https://i.pravatar.cc/150?img=3', 'La Madriguera', 'Ottery St Catchpole', 'Devon', 'Casa de 7 pisos', 'EX11 1AA']
    ];

    for (const usuario of usuarios) {
      await pool.query(
        'INSERT INTO usuario (nickname, mail, password, foto, direccion, ciudad, estado, punto_referencia, codigo_postal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        usuario
      );
    }
    console.log(`${usuarios.length} usuarios insertados\n`);

    // Productos del catálogo
    console.log('Insertando productos...');
    const productos = [
      ['Caramelo longuilinguo', 5, 'Inocentes caramelos que hacen que, al comerlos, la lengua se alargue diez veces más de su estado normal.', 'Caramelos', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245996/longuilinguo_fd5lvz.png', 10],
      ['Galletas de canarios', 7, 'Parecen galletas normales, pero quien las come se convierte en un enorme canario por un rato.', 'Galletas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245990/galletas-canario_zbokdj.png', 10],
      ['Salvajes magifuegos Weasley - Magicaja básica', 5, 'Selección básica de fuegos artificiales mágicos. Precaución: si se golpean, causan grandes explosiones.', 'Fuegos artificiales', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245991/magicaja_b7rd0m.png', 5],
      ['Salvajes magifuegos Weasley - Deflagración deluxe', 20, 'Selección de lujo de fuegos artificiales mágicos. Peligrosos al contacto o al usar hechizos desvanecedores.', 'Fuegos artificiales', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245987/deflagracion_xkns0q.png', 3],
      ['Orejas extensibles', 3, 'Escucha conversaciones ajenas con total discreción. No funciona si hay Encantamientos de Impasibilidad.', 'Accesorios', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245998/orejas_crkv1c.png', 10],
      ['Pantano portátil', 15, 'Ideal para decorar exteriores o interiores y molestar a profesores. Altamente pegajoso y persistente.', 'Bromas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245996/pantano_fceqrh.png', 5],
      ['Sombreros acéfalos', 2, 'Vuelve tu cabeza invisible para dar un buen susto a tus amigos.', 'Accesorios', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246005/sombrero-acefalo_j8vgqy.png', 8],
      ['Bombones desmayo', 1, 'Provocan un desmayo inmediato. Necesitas a alguien que te dé la otra mitad para curarte.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246006/bombones-desmayo_k89dde.png', 20],
      ['Pastillas vomitivas', 1, 'Causan vómitos al instante. Perfectas para librarte de clases indeseadas.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245999/pastillas-vomitivas_nx7ldc.png', 20],
      ['Turrón sangranarices', 1, 'Provoca una considerable hemorragia nasal temporal.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246006/turron-sangranarices_ozcbme.png', 15],
      ['Caramelo de la fiebre', 1, 'Aumenta la temperatura corporal causando fiebre temporal.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245987/caramelo-fiebre_vk2q2h.png', 15],
      ['Manantial de sangre', 1, 'Caramelos que provocan una gran hemorragia nasal mágica.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245991/manantial-sangre_r9qo7o.png', 10],
      ['Varitas falsas', 5, 'Parecen varitas reales, pero se transforman en muñecos de goma al usarlas.', 'Varitas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246007/varita-falsa_qw38dm.png', 5],
      ['Caramelos de la verdad', 10, 'Inspirados en el Veritaserum, obligan a decir la verdad durante una hora.', 'Caramelos', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245987/caramelo-verdad_mmiclr.png', 12],
      ['Chocolate rompedientes', 11, 'Chocolate imposible de partir. Provoca gran dolor al intentar morderlo.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245989/chocolate-rompedientes_gwxe8a.png', 8],
      ['Libro mordedor', 5, 'La letra se encoge hasta obligar al lector a acercarse... ¡y morderle la nariz!', 'Libros', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246010/libro-mordedor_dduk2b.png', 5],
      ['Pergamino inservible', 1, 'Todo lo que se escriba en él desaparece al instante. Ideal para jugar bromas en exámenes.', 'Papelería', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245999/pergamino_f2pkqt.png', 20],
      ['Pluma invisible', 1, 'La tinta desaparece a los 10 minutos. Perfecta para escribir mensajes temporales.', 'Papelería', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246000/pluma-invisible_b81qqh.png', 20],
      ['Spray aumenta todo', 3, 'Rocía y agranda cualquier objeto o persona. Efecto de hasta tres días.', 'Bromas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246006/spray-aumenta_v0gzsc.png', 10],
      ['Varitas del revés', 6, 'Lanzan el contrahechizo del conjuro que realmente se quiere usar.', 'Varitas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246008/varita-reves_zl2kb6.png', 5],
      ['Fantasías patentadas', 25, 'Con un conjuro accedes a una fantasía de 30 minutos, muy realista. Efectos secundarios: mirada ausente y babeo.', 'Hechizos', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246010/fantasia_rpwth0.png', 3],
      ['Marcas Tenebrosas comestibles', 2, 'Dulces con forma de Marca Tenebrosa que enferman a quien los come.', 'Dulces', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245996/marca-tenebrosa_vpaoll.png', 10],
      ['Sombreros, capas y guantes escudo', 30, 'Rebotan maleficios leves a moderados. Usados incluso por el Ministerio de Magia.', 'Accesorios', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245989/escudo_bfqucw.png', 2],
      ['Polvo peruano de oscuridad instantánea', 18, 'Crea oscuridad total al instante. Ideal para escapar o esconderse.', 'Bromas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246004/polvo-peruano_tjsytp.png', 5],
      ['Detonadores trampa', 5, 'Objetos con forma de bocina que explotan con un fuerte ruido para crear distracciones.', 'Bromas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245987/detonador_dt5qmf.png', 5],
      ['Puffskeins pigmeos', 8, 'Adorables puffskeins en miniatura, perfectos como mascotas mágicas.', 'Mascotas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246003/puffskein_dzu14b.png', 10],
      ['Pociones de amor', 4, 'Pociones de amor caseras que duran 24 horas. Disfrazadas como perfumes para despistar a Filch.', 'Pociones', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765246001/pocion-amor_hwdms1.png', 10],
      ['Lord Kakadura', 3, 'Producto de broma que causa estreñimiento. Sátira contra el Señor Tenebroso.', 'Bromas', 'https://res.cloudinary.com/delqfztgg/image/upload/v1765245994/lord-kakadura_y3sfrh.png', 5]
    ];


    for (const producto of productos) {
      await pool.query(
        'INSERT INTO catalogo (nombre, precio, descripcion, categoria, imagen, stock) VALUES (?, ?, ?, ?, ?, ?)',
        producto
      );
    }
    console.log(`${productos.length} productos insertados\n`);

    // Pedidos
    console.log('Insertando pedidos...');
    const pedidos = [
      [1, 'pagado', 'tarjeta', 815.97, 'Privet Drive 4', 'Little Whinging', 'Surrey', 'Debajo de la escalera', 'KT12 8PE', 'Entrega urgente por favor'],
      [2, 'enviado', 'paypal', 529.98, 'Willow Lane 27', 'Londres', 'Inglaterra', 'Casa muggle', 'SW1A 1AA', 'Dejar con el vecino si no estoy'],
      [3, 'entregado', 'efectivo', 125.98, 'La Madriguera', 'Ottery St Catchpole', 'Devon', 'Casa de 7 pisos', 'EX11 1AA', null]
    ];

    for (const pedido of pedidos) {
      await pool.query(
        'INSERT INTO pedido (id_usuario, estado, metodo_pago, total, direccion_entrega, ciudad_entrega, estado_entrega, punto_referencia_entrega, codigo_postal_entrega, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        pedido
      );
    }
    console.log(`${pedidos.length} pedidos insertados\n`);

    // Reseñas
    console.log('Insertando reseñas...');
    const resenas = [
      [5, '¡La varita es increíble! Funciona perfectamente con cualquier hechizo.', 1, 1],
      [5, 'La escoba más rápida que he probado. Perfecta para partidos profesionales.', 1, 2],
      [4, 'Buen caldero, aunque se calienta un poco rápido. Cumple su función.', 2, 3],
      [5, 'El mapa es exactamente como lo describe. ¡Juro solemnemente que mis intenciones no son buenas!', 1, 4],
      [5, 'Increíble capa, nadie me ve cuando la uso. Vale cada galeón.', 3, 5],
      [4, 'La snitch es genial para entrenar, aunque es muy rápida.', 3, 6],
      [5, 'Felix Felicis cambió mi vida por un día. ¡Experiencia única!', 2, 7],
      [5, 'El sombrero me seleccionó correctamente. ¡Gryffindor!', 2, 8]
    ];

    for (const resena of resenas) {
      await pool.query(
        'INSERT INTO resena (calificacion, comentario, id_usuario, id_producto) VALUES (?, ?, ?, ?)',
        resena
      );
    }
    console.log(`${resenas.length} reseñas insertadas\n`);

    // 7. VERIFICAR CREACIÓN
    console.log('Verificando tablas creadas...');
    const [tables] = await pool.query('SHOW TABLES');
    console.log('Tablas en la base de datos:');
    tables.forEach(table => {
      console.log(`   - ${Object.values(table)[0]}`);
    });

    console.log('\nSetup completado exitosamente!\n');

    // 8. MOSTRAR ESTADÍSTICAS
    const [countUsuarios] = await pool.query('SELECT COUNT(*) as total FROM usuario');
    const [countProductos] = await pool.query('SELECT COUNT(*) as total FROM catalogo');
    const [countPedidos] = await pool.query('SELECT COUNT(*) as total FROM pedido');
    const [countResenas] = await pool.query('SELECT COUNT(*) as total FROM resena');

    console.log('Estadísticas de datos:');
    console.log(`Usuarios: ${countUsuarios[0].total}`);
    console.log(`Productos: ${countProductos[0].total}`);
    console.log(`Pedidos: ${countPedidos[0].total}`);
    console.log(`Reseñas: ${countResenas[0].total}`);
  } catch (error) {
    console.error('Error durante el setup:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Ejecutar el setup
setupDatabase()