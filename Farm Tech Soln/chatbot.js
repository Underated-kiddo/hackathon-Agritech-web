// Simple FAQ-style chatbot logic for Farm Tech Soln
function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) {
        return "Hello! I'm the Farm Tech Soln assistant. How can I help you today?";
    }
    if (input.includes('developer') || input.includes('who made')) {
        return "This website was developed by Hooper Smith and Shadow.";
    }
    if (input.includes('how to buy') || input.includes('buy')) {
        return "To buy products, log in as a buyer or local market, then use the 'Search Products' option on your dashboard.";
    }
    if (input.includes('how to sell') || input.includes('sell')) {
        return "To sell products, log in as a farmer and use the 'Add Product' option on your dashboard.";
    }
    if (input.includes('tips') || input.includes('farming')) {
        return "You can find farming tips under the 'Farming Tips' section in the services page or your dashboard.";
    }
    if (input.includes('delivery')) {
        return "After buying, you can fill the delivery form and choose your payment method.";
    }
    if (input.includes('contact')) {
        return "You can contact us via Instagram, Telegram, Discord, or X. See the About Us page for details.";
    }
    if (input.includes('login') || input.includes('signup')) {
        return "Use the Login or Sign-up links on the entry page to access your dashboard.";
    }
    return "I'm here to help! Please ask any question about using Farm Tech Soln.";
}

function appendMessage(text, sender) {
    const messages = document.getElementById('chatbot-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-message ' + sender;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add chatbot bubble and window to body
    const bubble = document.createElement('div');
    bubble.id = 'chatbot-bubble';
    bubble.title = 'Chat with us!';
    bubble.innerHTML = '&#128172;'; // chat icon
    document.body.appendChild(bubble);

    const windowDiv = document.createElement('div');
    windowDiv.id = 'chatbot-window';
    windowDiv.innerHTML = `
        <div id="chatbot-header">Ask Farm Tech Soln <span id="chatbot-close">&times;</span></div>
        <div id="chatbot-messages"></div>
        <form id="chatbot-input-area">
            <input id="chatbot-input" type="text" placeholder="Ask me anything..." autocomplete="off" />
            <button id="chatbot-send" type="submit">Send</button>
        </form>
    `;
    document.body.appendChild(windowDiv);

    // Show/hide logic
    bubble.onclick = function() {
        windowDiv.style.display = 'flex';
        setTimeout(() => document.getElementById('chatbot-input').focus(), 100);
    };
    document.getElementById('chatbot-close').onclick = function() {
        windowDiv.style.display = 'none';
    };

    // Chat logic
    document.getElementById('chatbot-input-area').onsubmit = function(e) {
        e.preventDefault();
        const input = document.getElementById('chatbot-input');
        const userText = input.value.trim();
        if (!userText) return;
        appendMessage(userText, 'user');
        setTimeout(() => {
            appendMessage(getBotResponse(userText), 'bot');
        }, 400);
        input.value = '';
    };
});
