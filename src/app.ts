import express, { Response } from 'express';
import dotenv from 'dotenv';

// Config
dotenv.config();
const app = express();

app.get('/', (req, res: Response) => {
    return res.status(200).json({ msg: 'Hello World!' });
});

export default app;
