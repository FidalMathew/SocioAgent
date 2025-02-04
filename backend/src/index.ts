import express, { Request as ExpressRequest } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { communicateWithAgent, initializeAgent } from "./cdpActions";
import { callChatFunction } from "./ai-agent-src/index"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// initializeAgent

let cdpAgent: any, cdpConfig: any;

const main = async () => {

    const { agent, config } = await initializeAgent();
    cdpAgent = agent;
    cdpConfig = config;
}

main();



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
    const { prompt } = req.body;
    res.json({ message: `Hello, TypeScript Backend! ${prompt}` });
});


app.post("/chatcdp", async (req: Request, res: Response) => {
    const { prompt } = req.body;

    const promptResponse = await communicateWithAgent(cdpAgent, cdpConfig, prompt);
    console.log(promptResponse);

    res.json({ message: promptResponse });
});


app.post("/chat", async (req: Request, res: Response) => {
    const { prompt } = req.body;
    try {
        const aiResponse = await callChatFunction(prompt);
        console.log(aiResponse, 'aiResponse');

        res.json({ message: aiResponse });
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
