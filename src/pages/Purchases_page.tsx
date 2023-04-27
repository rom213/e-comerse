import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import { Box, Container } from '@mui/system'
import React from 'react'
import { Globalstore } from '../secstore/Store_global'
import '../pages/purchases.css'
import Purchase from '../componets/Purchase'
const Purchases_page:React.FC<{}> = () => {
  const { purshases } =Globalstore()

  return (
    <div className='purchases'>
        <h1>bought</h1>
        <div className='contentpurchase'>
          {
            purshases.map((state)=>{
              return <Purchase state={state} />
            })
          }
        </div>
    </div>
  )
}

export default Purchases_page