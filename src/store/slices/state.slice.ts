import { createSlice } from "@reduxjs/toolkit";



const stat=createSlice({
    name:'stado',
    initialState:0,
    reducers:{
        setstate:(state,action)=>action.payload,
        suma:(state,action)=>state+action.payload,
        resta:(state,action)=>state-action.payload
    }
})

export const {setstate, suma,resta} =stat.actions
export default stat.reducer