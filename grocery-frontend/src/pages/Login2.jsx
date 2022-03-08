import {useState, useEffect} from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import axios from 'axios'
import Edit from './Edit'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

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


const Login = ({setCurrentUser, currentUser, handleLogout, handleLogin, handleCreateUser, handleToggleForm, handleToggleLogout, toggleLogin, toggleLogout, username, setUsername, password, setPassword, groceries, setGroceries, toggleError, setToggleError, errorMessage, setErrorMessage}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edit, setEdit] = useState('')


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
       <Box sx={style} className = 'accountModal'>
        <div className = 'footerLogoDiv'>
        <img className = 'logo' src = 'https://i.imgur.com/syW8iwL.png?1'></img>
        </div>
        <CloseIcon className = 'closeIcon' onClick = {handleClose}/>
        <div className = 'welcomeDiv'>
        {currentUser.username ?
          <div>
            <h3>Welcome back, {currentUser.username}! </h3>

          </div>
          :
          null
        }
           <div className = 'logoutDiv'>
             {toggleLogout ?
               <div className = 'logoutButtonDiv'>
               <button className='logoutButton' onClick={handleClose}>Back to site</button>
               <button className='logoutButton' onClick={handleLogout}>Logout</button>
               </div>
             :
               <div className = 'buttonDiv'>
                 {toggleLogin ?
                   //login form
                   <div className = 'loginDiv'>
                     <h3>Sign In To Your Account</h3>
                     <form className = 'loginForm' onSubmit={handleLogin}>
                       <input className = 'addInput' type='text' placeholder='username...' onChange={(event)=> {setUsername(event.target.value)}}/><br/>
                       <input className = 'addInput' type='password' placeholder='password...' onChange={(event)=> {setPassword(event.target.value)}}/><br/>
                       {toggleError ?
                         <h5 className = 'errorMessage'>{errorMessage}</h5>
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
                       <h5 className = 'errorMessage'>{errorMessage}</h5>
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
