// Initialize socket.io (v4+)
const socket = io();

// DOM Elements
const messageInput = document.querySelector('#message');
const handleInput = document.querySelector('#name');
const sendButton = document.querySelector('#send');
const output = document.querySelector('#output');
const feedback = document.querySelector('#feedback');

// Send chat message
sendButton.addEventListener('click', () => {
  if (messageInput.value.trim() && handleInput.value.trim()) {
    socket.emit('chat', {
      message: messageInput.value,
      handle: handleInput.value,
    });
    messageInput.value = '';
  } else {
    alert('All fields are required!');
  }
});

// Notify when typing
messageInput.addEventListener('keypress', () => {
  socket.emit('typing', handleInput.value);
});

// Listen for chat messages from server
socket.on('chat', (data) => {
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});

// Handle "typing" feedback with a short timeout to clear the message
let timer = setTimeout(clearFeedback, 1000);
socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
  clearTimeout(timer);
  timer = setTimeout(clearFeedback, 1000);
});

function clearFeedback() {
  feedback.innerHTML = '';
}
