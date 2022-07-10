const socket = io.connect()


let msgInput = document.getElementById('chat-input')
let toInput = document.getElementById('to-input')
let userID = document.getElementById('userID').innerHTML
let userName = document.getElementById('userName').innerHTML
let userAvatar = document.getElementById('userAvatar').innerHTML
let btn = document.getElementById('chat-send')
let output = document.getElementById('chat-output')
let actions = document.getElementById('chat-actions')

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
        toInput.classList.remove("input-required")
    }
})


msgInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btn.click()
    }
});


socket.on('loadMessages', (msgs) => {
    output.innerHTML = ''
    for (let i = 0; i < msgs.length; i++) {
        if (msgs[i].from == userID || msgs[i].to == userID) {
            if (msgs[i].from == 'admin') {
                output.innerHTML += `<p class="align-self-end d-flex me-3"><span class="chatUserName me-2">${msgs[i].userName}:</span> ${msgs[i].content}<img class="me-3" style="object-fit:cover;" src="${msgs[i].userAvatar}" alt="cart icon"
                width="40" height="40"></p>`
            } else {
                output.innerHTML += `<p class="d-flex"> <img class="mx-3" style="object-fit:cover;" src="${msgs[i].userAvatar}" alt="cart icon"
            width="40" height="40"><span id="chatLeft" class="chatUserName">${msgs[i].userName}:</span> <span class="ms-2">${msgs[i].content}</span></p>`
            }
        }
    }
    msgInput.value = ''
})

socket.on('chatMessage', (msg) => {
    if (msg.from == userID || msg.to == userID) {
        if (msg.from == 'admin') {
            output.innerHTML += `<p class="align-self-end d-flex me-3"><span class="chatUserName me-2">${msg.userName}:</span> ${msg.content}<img class="me-3" style="object-fit:cover;" src="${msg.userAvatar}" alt="cart icon"
                width="40" height="40"></p>`
        } else {
            output.innerHTML += `<p class="d-flex"> <img class="mx-3" style="object-fit:cover;" src="${msg.userAvatar}" alt="cart icon"
            width="40" height="40"><span id="chatLeft" class="chatUserName">${msg.userName}:</span> <span class="ms-2">${msg.content}</span></p>`
        }
    }
    msgInput.value = ''
})

























// const chatInput = document.getElementById('chatInput')
// const email = document.getElementById('chatEmail')

// let userId

// document.getElementById('chatBtn').addEventListener('click', () => {
//     const msgData = {
//         content: chatInput.value,
//     }
//     socket.emit('message', msgData),
//         chatInput.value = ''
// })


// socket.on('data', data => {

//     const chatTemplate = Handlebars.compile(`{{#each data}}
//                                                     <span class="fw-bold text-primary">• {{id}}</span>
//                                                     <span class="text-warning">{{timestamp}} :</span>
//                                                     </span> <span class="fst-italic text-success">{{content}}</span>
//                                                 <br>
//                                             {{/each}}`)

//     const chatContent = chatTemplate({ data })

//     document.querySelector('p').innerHTML = chatContent
// })
