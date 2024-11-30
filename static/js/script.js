let chatMessages = {};
let ws = true;
const socket = io({autoConnect: false})
if(ws){
    socket.connect()
}

socket.on("connect", function(){
    socket.emit("test", "user_stuff");
})
// reloads all the messages that are
updateChat();
socket.on("updateChat", function (server_data){
    addMessageToChat(server_data);
})
const chat_log = document.getElementsByClassName("chat_log");
socket.on("deleteUpdate", function(messageId){
    let message_2b_deleted = document.getElementById(messageId);
    message_2b_deleted.remove()
})

socket.on("likeMessage_client", function (server_data){
    let update_like = document.getElementById(server_data.message_id);
    update_like.textContent = server_data.num
})

if(!ws){
    setInterval(updateChat, 500);
}


window.addEventListener("load", (event) => {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.response);
            const response = JSON.parse(this.response)
            if (response.score === "invalid"){
                document.getElementById(`score`).textContent = "";
            } else {
                document.getElementById(`score`).textContent = "Score: " + response.score;
            }
        }
    }

    request.open("POST", "/send_score", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify({"score" : 0}));
});

document.addEventListener("keypress", function (event) {
    // Check if the Enter key is pressed and the chat input field is focused
    if (event.code === "Enter" && document.activeElement == document.getElementById("chat-input")) {
        sendChat();
    }
});

function sendChat() {
    let userInput = document.getElementById("chat-input");
    let userInputValue = userInput.value;

    userInput.value = "";
    if (ws){
        socket.emit("sendChat", userInputValue)

    } else {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.response);
            }
        }
        const messageJSON = {"message": userInputValue};
        request.open("POST", "/chat-messages");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(messageJSON));
    }


    // userInput.focus();
}

function chatMessageHTML(messageJSON) {
    const username = messageJSON.username;
    const message = messageJSON.message;
    const messageId = messageJSON.id;
    const from_user = messageJSON.from_user;
    const like_count = messageJSON.like_count;
    const profile_pic = messageJSON.profile_pic;
    // console.log(profile_pic);

    let origin = "other";
    if (from_user) {
        origin = "original";
    }

    let messageHTML = `
        <div class="message-container" id="message_${messageId}">
            <button class="delete-button" onclick="deleteMessage('${messageId}')"> X </button>
            ${username} <br>
            <section class="message-body">
                <img class="chatProfile" src="${profile_pic}" alt="Profile Icon" />
                <div class="${origin}"> ${message} </div> <br>
            </section>
            <button class="like-button" onclick="likeMessage('${messageId}')"> 👍 </button> 
            <span id="like_count_${messageId}">${like_count}</span>
        </div>
        `
    return messageHTML
}

function deleteMessage(messageId) {
    if(ws){
        socket.emit("deleteMessage", messageId)
    } else {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.response);
            }
        }
        request.open("POST", "/chat-messages/" + messageId);
        request.send();
    }
}

function likeMessage(messageId){
    if (ws){
        socket.emit("likeMessage", messageId)
    } else {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.response);
                const response = JSON.parse(this.response)
                document.getElementById(`like_count_${messageId}`).textContent = response.like_count;
            }
        }

        request.open("POST", "/chat-messages/like/" + messageId);
        request.send();
    }
}

function addMessageToChat(messageJSON) {
    const chatMessages = document.querySelector('.chat-log');
    chatMessages.insertAdjacentHTML("beforeend", chatMessageHTML(messageJSON))
    chatMessages.scrollIntoView(false);
    chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
}

function updateChat() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            updateChatMessages(JSON.parse(this.response));
        }
    }
    request.open("GET", "/chat-messages");
    request.send();
}

function updateChatMessages(serverMessages) {
    let serverIndex = 0
    let localIndex = 0;

    while (serverIndex < serverMessages.length && localIndex < chatMessages.length) {
        let fromServer = serverMessages[serverIndex];
        let localMessage = chatMessages[localIndex];
        if (fromServer["id"] !== localMessage["id"]) {
            // this message has been deleted
            const messageElem = document.getElementById("message_" + localMessage["id"]);
            messageElem.parentNode.removeChild(messageElem);
            localIndex++;
        } else {
            serverIndex++;
            localIndex++;
        }
    }

    while (localIndex < chatMessages.length) {
        let localMessage = chatMessages[localIndex];
        const messageElem = document.getElementById("message_" + localMessage["id"]);
        messageElem.parentNode.removeChild(messageElem);
        localIndex++;
    }

    while (serverIndex < serverMessages.length) {
        addMessageToChat(serverMessages[serverIndex]);
        serverIndex++;
    }
    chatMessages = serverMessages;
}

document.getElementById('profilePic').addEventListener('click', function() {
    document.getElementById('popupModal').style.display = 'flex';
    document.getElementById('profilePic').style.border = '6px solid rgba(255, 255, 255, 0.2)';
});

document.querySelector('.close-button').addEventListener('click', function() {
    document.getElementById('popupModal').style.display = 'none';
    document.getElementById('profilePic').style.border = '6px solid transparent';
});

window.addEventListener('click', function(event) {
    let modal = document.getElementById('popupModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('profilePic').style.border = '6px solid transparent';
    }
});

document.getElementById('fileInput').onchange = function() {
    if (this.files.length > 0) {
        document.getElementById('uploadForm').submit(); // Submit form when file is selected
    }
};
