import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose'
import { router } from './routes/router.js';
import pkj from "./package.json" assert { type: "json" };

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

// Usar el router principal
app.use('/api', router);

app.get("/", (req, res) => {
    res.json({
        name: pkj.name,
        author: pkj.author,
        version: pkj.version,
        description: pkj.description,
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});