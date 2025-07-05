import {app} from './app.js'
import dotenv from "dotenv";
import { connectDB } from "./Db/index.js";
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`✅ Server running on port: ${port}`);
    });

    app.on("error", (err) => {
      console.error("❌ Server error:", err);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed:", err);
  });
