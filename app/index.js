// Importamos Express para crear un servidor web simple
const express = require('express');

// Importamos mysql2 para probar la conexión con RDS
const mysql = require('mysql2/promise');

// Creamos la aplicación Express
const app = express();

// Definimos el puerto del contenedor
const PORT = process.env.PORT || 3000;

// Variables de entorno para la base de datos
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

/**
 * Ruta principal
 * Sirve para validar que la aplicación está en línea
 */
app.get('/', (req, res) => {
  res.send('Aplicación PRO desplegada correctamente en Amazon ECS Fargate');
});

/**
 * Ruta de salud
 * Esta ruta se usa para health checks del Load Balancer
 */
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/**
 * Ruta para probar conexión a la base de datos
 * Intenta abrir una conexión a RDS y responder si todo está bien
 */
app.get('/db-check', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });

    // Ejecutamos una consulta simple para validar conectividad
    const [rows] = await connection.execute('SELECT NOW() AS server_time');

    await connection.end();

    res.json({
      status: 'success',
      message: 'Conexión exitosa con RDS',
      data: rows[0]
    });
  } catch (error) {
    console.error('Error conectando a la base de datos:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'No se pudo conectar a la base de datos',
      detail: error.message
    });
  }
});

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
