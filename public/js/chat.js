const socket = io()

// Elements

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Template

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

// Options

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefi: true })

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(message)=>{
    console.log(message)
    const html = Mustache.render(locationMessageTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute('disable','disable')

    const message = e.target.elements.message.value

    socket.emit('sendMessage',message, (error)=>{
        $messageFormButton.removeAttribute('disable')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error){
            return console.log(error)
        }

        console.log('Message delivered')
    })
})

$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    $sendLocationButton.setAttribute('disable','disable')


    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, ()=>{
            $sendLocationButton.removeAttribute('disable')
            console.log('Location shared')
        })
    })
})

socket.emit('join', {username, room},(error)=>{
    if(error)
    alert(error)
    location.href = '/'
})