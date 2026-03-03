// TODO: Import mongoose
// TODO: Get the MongoDB URI from environment variables (or use a default)
// TODO: Connect to MongoDB and log the connection status
import mongoose from "mongoose";

let MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ironprojects";

if (process.env.NODE_ENV === "test") {
  MONGODB_URI += "_test";
}

mongoose
  .connect(MONGODB_URI)
  .then((db) => {
    // Conexión exitosa: muestra el host de la base de datos
    console.log(`MongoDB connected: ${db.connection.host}`);
  })
  .catch((error) => {
    // Error de conexión: muestra el error en consola
    console.error(`error MongoDB`, error);
});