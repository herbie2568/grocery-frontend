import {useState, useEffect} from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import axios from 'axios'
import Edit from './Edit'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: '#daf2df',
  border: '2px solid #eba743',
  p: 2,
  px: 4,
  pb: 3,
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
   axios.post('https://stark-shelf-08940.herokuapp.com/users/createaccount',
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
    axios.put('https://stark-shelf-08940.herokuapp.com/users',
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
      axios.get(`https://stark-shelf-08940.herokuapp.com/users/findOne/${username}`,
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


  return (
    <div>
      <button className = 'loginButton' type="button" onClick={handleOpen}>
        <AccountCircleIcon />Account
      </button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <div className = 'footerLogoDiv'>
        <img className = 'logo' src = 'https://i.imgur.com/syW8iwL.png?1'></img>
        </div>
        <div className = 'welcomeDiv'>
        {currentUser.username ?
          <div>
            <h3>Welcome back {currentUser.username}! </h3>

          </div>
          :
          null
        }
           <div className = 'logoutDiv'>
             {toggleLogout ?
               <button className='logoutButton' onClick={handleLogout}>Logout</button> :
               <div className = 'buttonDiv'>
                 {toggleLogin ?
                   //login form
                   <div className = 'loginDiv'>
                     <h3>Sign In To Your Account</h3>
                     <form className = 'loginForm' onSubmit={handleLogin}>
                       <input className = 'addInput' type='text' placeholder='username...' onChange={(event)=> {setUsername(event.target.value)}}/><br/>
                       <input className = 'addInput' type='password' placeholder='password...' onChange={(event)=> {setPassword(event.target.value)}}/><br/>
                       {toggleError ?
                         <h5>{errorMessage}</h5>
                         :
                         null
                       }
                       <input className='submitButton' type='submit' value='Login'/>
                     </form>
                   </div>
                 :
                 // new user form
                 <div className = 'loginDiv'>
                   <h3>Create an Account</h3>
                   <form className = 'loginForm' onSubmit={handleCreateUser}>
                     <input className = 'addInput' type='text' placeholder='username...' onChange={(event)=> {setUsername(event.target.value)}}/><br/>
                     <input className = 'addInput' type='password' placeholder='password...' onChange={(event)=> {setPassword(event.target.value)}}/><br/>
                     {toggleError ?
                       <h5>{errorMessage}</h5>
                       :
                       null
                     }
                     <input className='submitButton' type='submit' value='Create Account'/>
                   </form>
                 </div>
                 }
                 <button className = 'accountButton' onClick={handleToggleForm}>{toggleLogin ? 'Don\'t have an account?' : 'Already have an account?'}</button>
               </div>
             }


           </div>

         </div>
        </Box>
      </StyledModal>



    </div>
  );
}


export default Login
