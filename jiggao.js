const apiKey = process.env.OPENAI_API_KEY;
// Use apiKey to make API calls to OpenAI
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatMessages = document.getElementById('chat-messages');

    // Display user message
    chatMessages.innerHTML += `<p><strong>তুমি:</strong> ${userInput}</p>`;

    // Clear input field
    document.getElementById('user-input').value = '';

    // Send user message to OpenAI API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150,
            temperature: 2.0
        })
    })
    .then(response => response.json())
    .then(data => {
        const aiResponse = data.choices[0].text.trim();
        // Display AI response
        chatMessages.innerHTML += `<p><strong>আমি:</strong> ${aiResponse}</p>`;
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => console.error('Error:', error));
}
