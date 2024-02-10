// server.js

import express from "express";
import router from "./routes/route.js";
import cors from "cors";
import DBConnection from "./database/db.js";
import path from "path"; // Import path module to handle file paths

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use the router for routing requests
app.use("/", router);

DBConnection();
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
