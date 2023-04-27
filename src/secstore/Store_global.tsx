import axios from 'axios'
import create from 'zustand'
import config from '../utils/bearertoken'
import { Carshop, ppurchases, productts } from '../utils/interfase'


interface initialstate{
    pproducts: productts[],
    ThunkProdu:()=>Promise<void>,
    carshopp:Carshop[],
    ThunkCarshop:()=>Promise<void>
    purshases:ppurchases[],
    thunkpurshases:()=>Promise<void>
}


export const Globalstore=create<initialstate>((set,get)=>({
//Prooductos Disponibles
pproducts:[],
ThunkProdu:async ()=>{
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
    .then(res=>{
        const s:productts[]=res.data
        set(state=>({
            pproducts:s
        }))
    })
},
//Carrito de Compras
carshopp:[],
ThunkCarshop:async ()=>{
    const url:string='https://e-commerce-api-v2.academlo.tech/api/v1/cart'
    axios.get(url,config)
        .then(res=>{
            const s:Carshop[]=res.data
            set(state=>({
                carshopp:s
            }))
        })
},
purshases:[],

thunkpurshases:async ()=> {
const url:string='https://e-commerce-api-v2.academlo.tech/api/v1/purchases'
    axios.get(url,config)
    .then(res=>{
        const s:ppurchases[]=res.data
        set(state=>({
            purshases:s
        }))
    })
},





}))