import {useState} from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';

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

const Login = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className = 'loginButton' type="button" onClick={handleOpen}>
        Log In
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
          <h2 id="unstyled-modal-title">Log In</h2>
          <div className = "edit-container">
          <form >

          <input className = 'addInput' type = 'text' placeholder = 'Username...' /><br/>
          <input className = 'addInput' type = 'text' placeholder = 'Password...' /><br/>



            <input className = 'submitButton' type = 'submit' value = 'Log In' /><br/><br/>
            </form>
            </div>
        </Box>
      </StyledModal>
    </div>
  );
}

export default Login
