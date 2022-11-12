import express from "express";
import bodyParse from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

//bodyParser gui yeu cau
app.use(bodyParse.json({ limit: "30mb", extended: true }));
app.use(bodyParse.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://admin:admin12345@cluster0.ida8vwy.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3500;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
