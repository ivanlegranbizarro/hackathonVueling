import conexion from "./db/conexion.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import travelRoutes from "./routes/travelRoutes.js";

dotenv.config();

conexion();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/api", travelRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));