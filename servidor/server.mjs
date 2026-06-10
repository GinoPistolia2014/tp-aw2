import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import mongoose, { Error } from "mongoose";
import productsRouter from "./modulos/rutas/rutas.productos.mjs";
import ordersRouter from "./modulos/rutas/rutas.ordenes.mjs";

const PUERTO = 3000;
const app = express();
const DBconnection = await mongoose.connect("mongodb+srv://tomigauna:secunfest01@piercing.7cagxsm.mongodb.net/piercing")
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

