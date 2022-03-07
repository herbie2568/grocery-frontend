import {useState, useEffect} from 'react';
import axios from 'axios'

import Edit from './Edit'


const Login = () => {

  const [groceries, setGroceries] = useState([])
  const [edit, setEdit] = useState('')
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleCreateUser = (event) => {
   event.preventDefault()
   setUsername('')
   setPassword('')
   axios.post('http://localhost:3000/users/createaccount',
   {
     username: username,
     password: password
   })
   .then((response) => {
     if(response.data.username){
       setToggleError(false)
       setErrorMessage('')
       setCurrentUser(response.data)
       handleToggleLogout()
     } else {
       setErrorMessage(response.data)
       setToggleError(true)
     }
   })
 }

 const handleLogin = (event) => {
    event.preventDefault()
    axios.put('http://localhost:3000/users/login',
    {
      username: username,
      password: password
    })
    .then((response) => {
      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setToggleError(true)
        setErrorMessage(response.data)
      }
    }).then(() => {
      axios.get(`http://localhost:3000/users/findOne/${username}`,
    ).then((res) => {
      setGroceries(res.data)
    })
    })
  }

  const handleLogout = () => {
  setUsername('')
  setPassword('')
  setCurrentUser({})
  handleToggleLogout()
}

const handleToggleForm = (event) => {
 setToggleError(false)
 if(toggleLogin === true) {
   setToggleLogin(false)
 } else {
   setToggleLogin(true)
 }
}

const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

console.log(currentUser)

return (
  <>
  <div>
     <div>
       {toggleLogout ?
         <button className='logout' onClick={handleLogout}>Logout</button> :
         <div>
           {toggleLogin ?
             //login form
             <div>
               <h3>Please Login Below</h3>
               <form onSubmit={handleLogin}>
                 <input type='text' placeholder='username' onChange={(event)=> {setUsername(event.target.value)}}/><br/>
                 <input type='password' placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/><br/>
                 {toggleError ?
                   <h5>{errorMessage}</h5>
                   :
                   null
                 }
                 <input className='formButton' type='submit' value='Login'/>
               </form>
             </div>
           :
           // new user form
           <div>
             <h3>Create an Account</h3>
             <form onSubmit={handleCreateUser}>
               <input type='text' placeholder='username' onChange={(event)=> {setUsername(event.target.value)}}/><br/>
               <input type='password' placeholder='password' onChange={(event)=> {setPassword(event.target.value)}}/><br/>
               {toggleError ?
                 <h5>{errorMessage}</h5>
                 :
                 null
               }
               <input className='formButton' type='submit' value='Register'/>
             </form>
           </div>
           }
           <button onClick={handleToggleForm}>{toggleLogin ? 'Need an account?' : 'Already have an account?'}</button>
         </div>
       }


     </div>
     {currentUser.username ?
       <div>
         <h3>Welcome back {currentUser.username}, </h3>
       </div>
       :
       null
     }
   </div>
  </>
)

}

export default Login
