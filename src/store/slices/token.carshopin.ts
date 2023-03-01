import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../utils/bearertoken";


const carshopin=createSlice({
    name:'cartshopin',
    initialState:null,
    reducers:{
        setcarshopin:(state,action)=>action.payload
    }
})

export const {setcarshopin}=carshopin.actions
export default carshopin.reducer

export const getcarthunk:any=()=>(dispatch:any)=>{
const url:string='https://e-commerce-api-v2.academlo.tech/api/v1/cart'

axios.get(url,config)
 .then(res=>dispatch(setcarshopin(res.data)))
 .catch(err=>console.log(err))
}