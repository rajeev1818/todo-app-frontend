import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../api/authService'
import { todoEdit } from './getTodosReducer'

const user=JSON.parse(localStorage.getItem('userLogin'))

export const editTodo=createAsyncThunk('editTodo',async(obj,thunkAPI)=>{
    try {
        const data=await authService.updateTodo(obj.todoId,obj.state,user)
        thunkAPI.dispatch(todoEdit(data))
        return data
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const editTodoReducer=createSlice({
    name:'editTodo',
    initialState:{loading:false,todo:null,error:false,success:false,message:''},
    reducers:{
        editReducerReset(state,action){
            state.loading=false
            state.todo=null
            state.error=false
            state.success=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(editTodo.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(editTodo.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.todo=action.payload
            
        })
        .addCase(editTodo.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message=action.payload
        })
    }

})

export const {editReducerReset}=editTodoReducer.actions

export default editTodoReducer.reducer