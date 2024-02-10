import express from "express"
import router from "./routes/route.js"
import cors from "cors"
import DBConnection from "./database/db.js"
import path from "path"



const app = express()
app.use(cors())
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/",router)


const PORT=8000

DBConnection()
app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`))