const users = []

const addUser = ({ id, username, room })=>{
    // Clean the data
    console.log(">>>>>",id,"USERNAME:>>",username,"ROOM::",room)
   
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()
    console.log(username)
    
    // validate the data
    if(!username || !room){
        return {
            error: 'username and room are required!'
        }
    }

    //check for existing user
    const existingUser = user.find((user) =>{
        return user.room === room && user.username === username
    })

    // validate username
    if(existingUser){
        return {
            error: 'User is in use'
        }
    }

    // Store user
    const user ={ id, username, room }
    users.push(user)
    return { user }
}

const removeUser = (id)=>{
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id) => {
    return users.find((user)=> user.id === id)
}

const getUsersInRoom =(room)=>{
    room = room.trim().toLowercase()
    return users.filter((user)=> user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}