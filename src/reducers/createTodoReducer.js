import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../api/authService'
import { addNew } from './getTodosReducer'



export const createTodo=createAsyncThunk('createTodo',async(obj,thunkAPI)=>{
    try {
        const result=await authService.createTodo(obj.user,obj.state)
        thunkAPI.dispatch(addNew(result))
        return result
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const createTodoReducer=createSlice({
    name:'createTodo',
    initialState:{loading:false,todo:null,error:false,success:false,message:''},
    extraReducers:(builder)=>{
        builder
        .addCase(createTodo.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(createTodo.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.todo=action.payload
            
        })
        .addCase(createTodo.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message=action.payload
        })
    }

})

export default createTodoReducer.reducer