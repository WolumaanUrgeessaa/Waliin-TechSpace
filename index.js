import fetch from 'node-fetch';
import readline from 'readline';

const API_KEY = 'AIzaSyBGW3RoHvFXX4RlwUeRM73LZlg3vFiP9j8'; // Replace with your actual API key
const apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to get AI response
async function getResponse(inputText) {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: inputText
                    }]
                }]
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response from API.');
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Sorry, there was an error processing your request.";
    }
}

// Function to prompt user for input and get AI response
function promptUser() {
    rl.question('You: ', async (inputText) => {
        if (inputText.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        console.log('Fetching response from AI...');
        const aiResponse = await getResponse(inputText);
        console.log('AI Response:', aiResponse);

        promptUser();
    });
}

console.log("Chatbot started. Type 'exit' to quit.");
promptUser();
// import fetch from 'node-fetch';

// Make sure to use the `PORT` environment variable to bind to the correct port
const port = process.env.PORT || 3000; // Default to 3000 if PORT isn't set

// Example of an express server, if you're using Express:
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});