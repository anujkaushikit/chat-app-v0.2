
$(document).ready(function () {
    const socket = io();

    let name;

    const chat = document.querySelector('.chat-form');
    const input = document.querySelector('.chat-input');
    const chatWindow = document.querySelector('.chat-window');


    do {
        name = prompt('please enter your name before start chating')
    }
    while (!name)


    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            //event.preventDefault();
            sendMessage(event.target.value);
            // socket.emit('chat', input.value);
            // input.value = '';
        } 

    });

    function sendMessage(message) {
        let msg = {
            user: name,
            message: message.trim()
        } 
        appendMessage(msg, 'outgoing');
        input.value ='';
        //send to server
        socket.emit('message', msg);
    }

    function appendMessage(msg, type) {

        const mainDiv = document.createElement('div');
        let className = type;
        mainDiv.classList.add(className, 'message');
        let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `  
        mainDiv.innerHTML = markup;
        chatWindow.appendChild(mainDiv);
    } 

    //recived msg code from server
    socket.on('message', (msg) => {
        appendMessage(msg, 'incoming'); 
    });
 
    // const renderMessage = message => {
    //     const div = document.createElement('div')
    //     div.classList.add('render-message')
    //     div.innerText = message
    //     chatWindow.appendChild(div) 
    // }

    // socket.on('chat', message => {
    //     // make sure to modify this
    //     renderMessage(message)
    // });
});