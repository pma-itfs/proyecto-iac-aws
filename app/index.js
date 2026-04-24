/**
 * ==========================================
 * APP NODE.JS - VERSION PRO PARA AWS ECS
 * Autor: Marvin A. Oviedo
 * ==========================================
 */

const express = require('express');
const app = express();

// ==========================================
// CONFIGURACIÓN
// ==========================================
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "Proyecto IaC AWS";
const VERSION = process.env.APP_VERSION || "1.0.0";

// ==========================================
// MIDDLEWARES
// ==========================================
app.use(express.json());

// Logger simple (útil para CloudWatch)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ==========================================
// RUTAS PRINCIPALES
// ==========================================

// 🏠 Ruta raíz
app.get('/', (req, res) => {
  res.send(`🚀 ${APP_NAME} desplegado correctamente en Amazon ECS Fargate por Marvin A. Oviedo`);
});

// ❤️ Health Check (IMPORTANTE para ECS / Load Balancer)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Aplicación funcionando correctamente",
    timestamp: new Date()
  });
});

// 📦 Información de versión
app.get('/version', (req, res) => {
  res.json({
    app: APP_NAME,
    version: VERSION,
    author: "Marvin A. Oviedo"
  });
});

// ❌ Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📌 Nombre App: ${APP_NAME}`);
  console.log(`📦 Versión: ${VERSION}`);
});
