import {useState} from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import axios from 'axios'

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

`;

const style = {
  width: 400,
  bgcolor: '#daf2df',
  border: '2px solid #eba743',
  p: 2,
  px: 4,
  pb: 3,
};

const Signup = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [userInfo, setUserInfo] = useState([])

  const handleNewUsernameChange = (event)=>{
    setNewUsername(event.target.value);
  }

  const handleNewPasswordChange = (event)=>{
    setNewPassword(event.target.value);
  }

  const handleNewEmailChange = (event)=>{
    setNewEmail(event.target.value);
  }

  const handleSignupValue = (signupData) => {
    setNewUsername(signupData.username)
    setNewEmail(signupData.email)
    setNewPassword(signupData.password)
  }

  const handleNewSignupFormSubmit = (event)=>{
      event.preventDefault();
      axios.post(
          'http://localhost:3000/login',
          {
              username:newUsername,
              password: newPassword,
              email: newEmail,

          }).then(()=>{
          axios
              .get('http://localhost:3000/login')
              .then((response)=>{
                  setUserInfo(response.data)
              })
          })
    }

  return (
    <div>
      <button className = 'loginButton' type="button" onClick={handleOpen}>
        Sign Up
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
          <h2 id="unstyled-modal-title">Create an Account</h2>
          <div className = "edit-container">
          <form onSubmit = {handleNewSignupFormSubmit}>
          <input type = 'text' className = 'addInput' placeholder = 'Email address...' onChange={handleNewEmailChange}/><br/>
          <input className = 'addInput' type = 'text' placeholder = 'Username...' onChange={handleNewUsernameChange}/><br/>
          <input className = 'addInput' type = 'password' placeholder = 'Password...' onChange={handleNewPasswordChange}/><br/>



            <input className = 'submitButton' type = 'submit' value = 'Create Account' />
            <br/><br/>
            </form>
            </div>
        </Box>
      </StyledModal>
    </div>
  );
}

export default Signup
