import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import mongoose, { Error } from "mongoose";
import productsRouter from "./modulos/rutas/rutas.productos.mjs";
import ordersRouter from "./modulos/rutas/rutas.ordenes.mjs";
import config from "./config/config.mjs";
import usersRouter from "./modulos/rutas/rutas.usuarios.mjs";


export const PUERTO = config.puerto || 4000;
const app = express();
const DBconnection = await mongoose.connect(config.mongoUri)
  .then(console.log('Base de datos conectada correctamente'))
  .catch((err) => console.log('Error: ' + err.message))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =============================
   MIDDLEWARE
============================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true })); ///Permite que Express pueda interpretar los datos enviados desde un formulario
app.use(express.static(path.resolve(__dirname, "public"))); 

app.use('/api/v1', productsRouter);
app.use('/api/v1', ordersRouter);
app.use('/api/v1', usersRouter);


/* =============================
   RUTA 404
============================= */
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Página no encontrada</h1>
    <p>La ruta solicitada no existe.</p>
    <a href="/">Volver al inicio</a>
  `);
});

/* =============================
   SERVIDOR
============================= */
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});

