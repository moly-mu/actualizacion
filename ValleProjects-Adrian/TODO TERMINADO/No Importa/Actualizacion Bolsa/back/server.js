import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/router.js';
import pkj from "./package.json" assert { type: "json" };

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

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