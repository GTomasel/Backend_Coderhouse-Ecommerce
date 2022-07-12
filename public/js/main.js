const socket = io.connect()


let msgInput = document.getElementById('chat-input')
let toInput = document.getElementById('to-input')
let userID = document.getElementById('userID').innerHTML
let userName = document.getElementById('userName').innerHTML
let userAvatar = document.getElementById('userAvatar').innerHTML
let btn = document.getElementById('chat-send')
let output = document.getElementById('chat-output')
let actions = document.getElementById('chat-actions')
let chatOutput = document.getElementById('chat-output')

btn.addEventListener('click', function () {
    if (userID == 'admin' && toInput.value == '') {
        toInput.classList.add("input-required")
    }
    else {
        if (msgInput.value == '') {
            msgInput.classList.add("input-required")
        } else {
            socket.emit('chatMessage', {
                content: userID == 'admin' ? `(Para: ${toInput.value}): ${msgInput.value}` : msgInput.value,
                userName: userName,
                userAvatar: userAvatar,
                from: userID,
                to: userID == 'admin' ? toInput.value : 'admin'
            })
            msgInput.classList.remove("input-required")
        }
        if (toInput !== null) {
            toInput.classList.remove("input-required")
        }
    }
})


msgInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btn.click()
    }
})

chatOutput.addEventListener('click', event => {
    if (event.target.classList.contains('chatUserName') && toInput !== null) {
        const targetValue = event.target.childNodes[0].innerHTML
        toInput.value = targetValue
    }
})


socket.on('loadMessages', (msgs) => {
    output.innerHTML = ''
    for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].from == userID || msgs[i].to == userID) {
            if (msgs[i].from == 'admin') {
                output.innerHTML += `<p class="d-flex align-self-end align-items-center me-3"><span class="chatUserNameAdmin me-2">${msgs[i].userName}:</span> ${msgs[i].content}<img class="ms-2 me-3" style="object-fit:cover;" src="${msgs[i].userAvatar}" alt="cart icon"
                width="40" height="40"></p>`
            } else {
                output.innerHTML += `<p class="d-flex align-items-center"> <img class="mx-3" style="object-fit:cover;" src="${msgs[i].userAvatar}" alt="cart icon"
            width="40" height="40"><span id="chatLeft" class="chatUserName"><span style="font-size:0;">${msgs[i].from}</span>${msgs[i].userName}:</span> <span class="ms-2">${msgs[i].content}</span></p>`
            }
        }
    }
    msgInput.value = ''
})

socket.on('chatMessage', (msg) => {
    if (msg.from == userID || msg.to == userID) {
        if (msg.from == 'admin') {
            output.innerHTML += `<p class="d-flex align-self-end align-items-center me-3"><span class="chatUserNameAdmin me-2">${msg.userName}:</span> ${msg.content}<img class="ms-2 me-3" style="object-fit:cover;" src="${msg.userAvatar}" alt="cart icon"
                width="40" height="40"></p>`
        } else {
            output.innerHTML += `<p class="d-flex align-items-center"> <img class="mx-3" style="object-fit:cover;" src="${msg.userAvatar}" alt="cart icon"
            width="40" height="40"><span id="chatLeft" class="chatUserName"><span style="font-size:0;">${msg.from}</span>${msg.userName}:</span> <span class="ms-2">${msg.content}</span></p>`
        }
    }
    msgInput.value = ''
})



