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
