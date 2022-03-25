import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../api/authService'
import { todoDelete } from './getTodosReducer'


const user=JSON.parse(localStorage.getItem('userLogin'))


export const deleteTodo=createAsyncThunk('deleteTodo',async(id,thunkAPI)=>{
    try {
        await authService.deleteTodo(user,id)
        thunkAPI.dispatch(todoDelete(id))
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const deleteTodoReducer=createSlice({
    name:'deleteTodo',
    initialState:{loading:false,error:false,success:false,message:''},
    extraReducers:(builder)=>{
        builder
        .addCase(deleteTodo.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(deleteTodo.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true

        })
        .addCase(deleteTodo.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message=action.payload
        })
    }
})



export default deleteTodoReducer.reducer