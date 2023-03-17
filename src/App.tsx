import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import Productinfo from './pages/Productpage'
import Register from './pages/Register'
import Loginpage from './pages/Loginpage'
import Cardpage from './pages/Cardpage'
import { useNavigate } from 'react-router-dom'
import { Protectroutes } from './componets/Protectroutes'
import Purchases_page from './pages/Purchases_page'
import { Globalstore } from './secstore/Store_global'
import axios from 'axios'
import config from './utils/bearertoken'


const App:React.FC = ()=> {
  const [local, setlocal] = useState(false)
  const [quanty, setquanty] = useState(0)
  const [navigator, setnavigator] = useState(0)
  const navigate= useNavigate() 
  
  const {ThunkCarshop,carshopp, ThunkProdu} = Globalstore()

  useEffect(()=> {
    ThunkProdu()
    ThunkCarshop()
  }, [local])


  useEffect(() => {
  
      if (localStorage.getItem('token')) {
        let s:number[]=[]
        for (let index = 0; index < carshopp?.length; index++) {
          s.push((carshopp[index]?.quantity)*carshopp[index]?.product?.price)
        }
        let t:number=0
        for (let index = 0; index < s?.length; index++) {
          t=t+s[index]
        }
        setquanty(t)
      }
  }, [local,carshopp])

  useEffect(() => {
    setlocal(false)
  }, [localStorage.getItem('token')])
  
  const purshases=()=>{
    const url='https://e-commerce-api-v2.academlo.tech/api/v1/purchases'
    axios.post(url,{},config)
      .then(res=>{console.log(console.log(res.data),
        ThunkCarshop()
        )})
  }




  return (
    <div className="App">
      <div className='fix'>
        <div className='ecomer'>
          <h1 className='ecom'>e-comerse</h1>
        </div>
        <div className='contenicon'>
            <div onClick={()=>{setnavigator(1);navigate('user/login')}} className={`user user1 ${navigator===1 && 'guia'}`}><i  className='bx bx-user bx-md'></i></div>
            <div onClick={()=>{setnavigator(2);navigate('/purchases')}} className={`user user3 ${navigator===2 && 'guia'}`}><i className='bx bx-store-alt bx-md'></i></div>
            {
            localStorage.getItem('token') ?
            <div onClick={()=>{setnavigator(3); setlocal(!local)}} className={`user user2 ${local===true &&  navigator===3 && 'guia'}`}><i className='bx bx-cart bx-md' ></i></div>:
            <div onClick={()=>{setnavigator(1);navigate('/user/login')}} className='user user2'><i className='bx bx-cart bx-md' ></i></div>
            }
            <div onClick={()=>{setnavigator(0);navigate('/')} } className={`user hom ${navigator===0 && 'guia' }`}><i className='bx bx-home bx-md'></i></div>
        </div>
      </div>
      {
      local ? 
      <div className='desple'>
        <div className='yourcard'>
              <h1>your cart</h1>
        </div>
        {
          quanty!=0 ?
        <div>
        {
          carshopp?.map((state)=>{
            return <><div className='you'></div><Cardpage key={state.id} state={state} /></>
          })
        }
        </div>:
        <img className='img4' src="https://tiendaacademlo.netlify.app/empty-cart.png" alt="" />
}
{
  quanty !=0 ?
<div className='price'>
  <div className='a'>
    <h2 className='valu'>valor total: </h2>
    <h2><b>${quanty.toFixed(2)}</b></h2>
  </div>
  <div onClick={()=>{ purshases();}} className='btncomprar'>Buy Now</div>
</div>:
<div></div>
}
      </div>:
      <div></div>
}

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<Productinfo setnavigator={setnavigator}/> }/>
        <Route path='/user'>
          <Route path='register' element={<Register />}/>
          <Route  path='login' element={<Loginpage />} />
        </Route>
        <Route element={<Protectroutes />}>
          <Route path='/purchases' element={<Purchases_page />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
