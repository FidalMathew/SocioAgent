const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

import { Request as ExpressRequest } from "express";

interface Request extends ExpressRequest {
    body: {
        prompt: string;
    };
}

interface Response {
    json: (body: any) => void;
}

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, TypeScript Backend!" });
});

app.post("/test", (req: Request, res: Response) => {

    console.log(req.body);
    const {prompt} = req.body;
    res.json({ message: `Hello, TypeScript Backend! ${prompt}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
