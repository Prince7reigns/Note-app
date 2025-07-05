// app.js
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
const app = express();



dotenv.config({
    path:"./env"
})

// Middleware
app.use(express.json({limit:"16kb"})) 
app.use(cors())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

import noteRouter from './routes/notes.route.js'

app.use("/api/v1/notes",noteRouter)

// ✅ Add root route
app.get("/son", (req, res) => {
  res.status(200).send("✅ Server is Live on /");
});

export { app };
