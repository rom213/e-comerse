import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const proinf= createSlice({
    name:'proinf',
    initialState:null,
    reducers:{ 
        setproinf:(state,action)=>action.payload
    }
})

 export const {setproinf}=proinf.actions
 export default proinf.reducer

