import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)

//db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connect successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port http://localhost:${process.env.PORT}/api/auth`);
    }) 
})
.catch((err) => console.log(err))

app.get('/',(req,res)=>{
  res.json({
    mesaage: 'server connceted',
    status: 'ok'
  });
});
