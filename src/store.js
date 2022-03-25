import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

import getTodosReducer from './reducers/getTodosReducer'
import createTodoReducer from './reducers/createTodoReducer'
import deleteTodoReducer from './reducers/deleteTodoReducer'
import editTodoReducer from './reducers/editTodoReducer'

const store=configureStore({
    reducer:{
        userLogin:userReducer,
        userTodos:getTodosReducer,
        createTodo:createTodoReducer,
        deleteTodo:deleteTodoReducer,
        editTodo:editTodoReducer
    }

})


export default store



