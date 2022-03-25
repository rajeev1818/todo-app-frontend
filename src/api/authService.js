import axios from 'axios'

const url="https://todo-full-apis.herokuapp.com"

const login=async(userData)=>{
    const {data}= await axios.post(`${url}/api/login`,userData)
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }

    return data
}

const register=async(userData)=>{
    const {data}= await axios.post(`${url}/api/register`,userData)
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }

    return data
}

const getTodos=async(user)=>{
    const {token}= user
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }
        
    }

    const {data}= await axios.get(`${url}/api/todos`,config)
    
    return data
}


const createTodo=async(user,todo)=>{
    const {token}= user
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }
        
    }
    const {data} = await axios.post(`${url}/api/todos`,todo,config)
    return data
}

const deleteTodo=async(user,id)=>{
    const {token}=user
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }
        
    }
    await axios.delete(`${url}/api/todos/${id}`,config)

}

const getSingleTodo=async(id)=>{
    const {token}=JSON.parse(localStorage.getItem('userLogin'))
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }
        
    }

    const {data}= await axios.get(`${url}/api/todos/${id}`,config)
    return data

}

const updateTodo=async(id,todo,user)=>{
    const {token}= user
    const config={
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        }
        
    }
    const {data} = await axios.put(`${url}/api/todos/${id}`,todo,config)
    return data
}



const authService={
    login,
    register,
    createTodo,
    getTodos,
    deleteTodo,
    getSingleTodo,
    updateTodo
}

export default authService