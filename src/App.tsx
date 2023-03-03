import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { useDispatch } from 'react-redux'
import { getAllproductsThunk } from './store/slices/products.slices'
import Productinfo from './pages/Productpage'
import Register from './pages/Register'
import Loginpage from './pages/Loginpage'
import Cardpage from './pages/Cardpage'
import { useNavigate } from 'react-router-dom'
import { getcarthunk } from './store/slices/token.carshopin'
import { Protectroutes } from './componets/Protectroutes'


const App:React.FC = ()=> {
  const [local, setlocal] = useState(false)
  const dispatch=useDispatch()
  const navigate= useNavigate()
  const { cartshopin, stado }=useSelector((state:any)=>state)



  
  useEffect(()=> {
    dispatch(getAllproductsThunk()),
    dispatch(getcarthunk())
  }, [])


  useEffect(() => {
    setlocal(false)
  }, [localStorage.getItem('token')])
  
  
  return (
    <div className="App">
      <div className='fix'>
        <div className='ecomer'>
          <h1>e-comerse</h1>
        </div>
        <div className='contenicon'>
            <div onClick={()=>navigate('user/login')} className='user user1'><i  className='bx bx-user bx-md'></i></div>
            <div className='user user3'><i className='bx bx-store-alt bx-md'></i></div>
            {
            localStorage.getItem('token') ?
            <div onClick={()=>setlocal(!local)} className='user user2'><i className='bx bx-cart bx-md' ></i></div>:
            <div onClick={()=>navigate('/user/login')} className='user user2'><i className='bx bx-cart bx-md' ></i></div>
            }
            <div onClick={()=>navigate('/')} className='user hom'><i className='bx bx-home bx-md'></i></div>
        </div>
      </div>
      {
      local ? 
      <div className='desple'>
        <div className='yourcard'>
              <h1>your cart</h1>
        </div>

        {
          cartshopin?.map((state:any)=>{
            return <Cardpage state={(state)} />
          })
        }

<div className='price'>
    <h2>valor total: <b>{stado}</b></h2>
    <img className='img2' src="https://openmoji.org/php/download_asset.php?type=emoji&emoji_hexcode=1F928&emoji_variant=color" alt="" />
</div>
      </div>:
      <div></div>
}

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<Productinfo />}/>
        <Route path='/user'>
          <Route path='register' element={<Register />}/>
          <Route  path='login' element={<Loginpage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
