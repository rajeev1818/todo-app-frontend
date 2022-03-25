import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../api/authService'

const user=JSON.parse(localStorage.getItem('userLogin'))


export const login=createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const register=createAsyncThunk('auth/register',async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const userAuth=createSlice({
    name:'auth',
    initialState:{loading:false,user:user ? user: null,error:false,success:false,message:''},
    reducers:{
        
        logout(state,action){
            state.error=false
            state.loading=false
            state.success=false
            state.message=''
            state.user=null
            localStorage.removeItem('userLogin')
        },
        resetUserState(state,action){
            state.error=false
            state.loading=false
            state.success=false
            state.message=''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.user=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message=action.payload
            state.user=null
        })
        .addCase(register.pending,(state)=>{
            state.loading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.user=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading=false
            state.error=true
            state.message=action.payload
            state.user=null
        })
    }
})

export const {logout,resetUserState}=userAuth.actions




export default userAuth.reducer

