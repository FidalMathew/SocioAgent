// Install dependencies
// npm init -y

// npm install express cors dotenv
// npm install --save-dev typescript ts-node @types/node @types/express @types/cors

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

interface Request {
    // Add properties as needed
}

interface Response {
    json: (body: any) => void;
}

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello, TypeScript Backend!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create a tsconfig.json file with:
// {
//   "compilerOptions": {
//     "target": "ES6",
//     "module": "CommonJS",
//     "outDir": "dist",
//     "rootDir": "src",
//     "strict": true
//   }
// }

// To run the server: npx ts-node src/index.ts
