import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../api/authService'

export const getTodos=createAsyncThunk('getTodos/fetch',async(user,thunkAPI)=>{
    try {
        return await authService.getTodos(user)
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const getTodosReducer=createSlice({
    name:'getTodos',
    initialState:{loading:false,todos: [],error:false,success:false,message:''},
    reducers:{
        reset(state,action){
            state.error=false
            state.loading=false
            state.success=false
            state.message=''
            state.todos=[]
            
        },
        addNew(state,action){
            state.todos.push(action.payload)
        },
        todoDelete(state,action){
            state.todos=state.todos.filter((each)=>each._id.toString()!==action.payload.toString())
        },
        todoEdit(state,action){
            state.todos=state.todos.map((todo)=>todo._id.toString()===action.payload._id.toString()? action.payload:todo)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getTodos.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getTodos.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.todos=action.payload
        })
        .addCase(getTodos.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message=action.payload
            state.todos=[]
        })
        
        
        
        
    }
})

export const {reset,addNew,todoDelete,todoEdit}=getTodosReducer.actions




export default getTodosReducer.reducer

