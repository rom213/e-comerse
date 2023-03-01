import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const products= createSlice({
    name:'products',
    initialState:null,
    reducers:{ 
        setproducts:(state,action)=>action.payload
    }
})
export const {setproducts}=products.actions
export default products.reducer

export const getAllproductsThunk:any=()=>(dispatch:any)=>{
    const url:string='https://e-commerce-api-v2.academlo.tech/api/v1/products'
    axios.get(url)
        .then(res=>dispatch(setproducts(res.data)))
        .catch(err=>console.log(err))
}
