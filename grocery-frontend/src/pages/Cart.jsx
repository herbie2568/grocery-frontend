import {useState, useEffect} from 'react'
import axios from 'axios'
import Show from './Show.jsx'
import {
  Redirect,
  BrowserRouter,
  Routes,
  Route,
  Link,
  Switch,
  useParams
} from "react-router-dom" ;

const Cart = ({groceries, setGroceries, cart, setCart}) => {



  useEffect(()=>{
    axios
    .get('https://stark-shelf-08940.herokuapp.com/cart')
    .then((response)=>{
      setCart(response.data);
    })
  }, [])

  const handleDelete = (groceryData)=>{
    axios
    .delete(`https://stark-shelf-08940.herokuapp.com/cart/${groceryData._id}`)
      .then(()=>{
        axios
        .get('https://stark-shelf-08940.herokuapp.com/cart/')
        .then((response)=>{
          setCart(response.data)
        })
      })
    }

  





  return (
    <>


    <div className = 'cartContainer'>
    {
      cart.map((grocery)=>{
        if (!grocery.image) {
          grocery.image = 'https://i.imgur.com/KH2GvHe.png'
        }
        return (
          <>
          <div key = {grocery._id} >
          <div className = 'groceryDiv'>
          <div className = 'nameDiv'><li className = 'groceryName'>{grocery.name}</li></div>

          <img className = 'groceryImage' src = {grocery.image}></img>

          <div className = 'priceShowButton'>
          <li className = 'groceryPrice'>{grocery.price}</li>
          </div>
          </div>
          </div>
          <Routes>

          <Route path="/cart" element={<Cart groceries = {groceries} setGroceries = {setGroceries} cart = {cart} setCart = {setCart}/>}/>
          </Routes>
          </>
        )

  })
  }

  </div>
  </>

)

}
export default Cart
