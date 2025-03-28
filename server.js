import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    let botResponse = "I don't understand.";
    if (userMessage.includes("hello")) {
        botResponse = "Hello! How can I help you?";
    } else if (userMessage.includes("help")) {
        botResponse = "Sure! What do you need help with?";
    }

    res.json({ response: botResponse });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));