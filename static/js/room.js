const createMessage = (name, msg, isUser) => {
  const messageContainer = document.createElement('div');
  const messageClass = isUser ? 'my-message' : 'other-message';
  
  messageContainer.classList.add(messageClass);
  
  const messageContent = `
    <div>
      <strong>${name}</strong>: ${msg}
    </div>
    <div class="muted">
      ${new Date().toLocaleString()}
    </div>
  `;
  
  messageContainer.innerHTML = messageContent;
  messages.appendChild(messageContainer);
};

socketio.on("message", (data) => {
  const isUser = data.name === '{{ session.get("name") }}';
  createMessage(data.name, data.message, isUser);
});

const sendMessage = () => {
  const message = document.getElementById("message");
  if (message.value == "") return;
  socketio.emit("message", { data: message.value });
  message.value = "";
};
