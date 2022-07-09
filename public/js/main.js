const socket = io.connect()

const chatInput = document.getElementById('chatInput')
const email = document.getElementById('chatEmail')

let userId

document.getElementById('chatBtn').addEventListener('click', () => {
    const msgData = {
        content: chatInput.value,
    }
    socket.emit('message', msgData),
        chatInput.value = ''
})


socket.on('data', data => {

    const chatTemplate = Handlebars.compile(`{{#each data}}
                                                    <span class="fw-bold text-primary">• {{id}}</span>
                                                    <span class="text-warning">{{timestamp}} :</span>
                                                    </span> <span class="fst-italic text-success">{{content}}</span>
                                                <br>
                                            {{/each}}`)

    const chatContent = chatTemplate({ data })

    document.querySelector('p').innerHTML = chatContent
})
