import fetch from 'node-fetch';
import readline from 'readline';

const API_KEY = 'AIzaSyBGW3RoHvFXX4RlwUeRM73LZlg3vFiP9j8'; // Replace with your API key
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
        
        // Check if there is a valid response
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

        // Continue prompting user
        promptUser();
    });
}

// Start the chatbot
console.log("Chatbot started. Type 'exit' to quit.");
promptUser();