import {useState} from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Nunito from '../Nunito/static/Nunito-Bold.ttf'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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
  bgcolor: 'background.paper',
  border: '2px solid #eba743',
  p: 2,
  px: 4,
  pb: 3,
};

const Show = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState(false)
  const [heartColor, setHeartColor] = useState('grey')
  const [cartColor, setCartColor] = useState('grey')

  const heartColorChange = () => {
    if (heartColor === 'grey') {
      setHeartColor('red')
    }else {
      setHeartColor('grey')
    }
  }

  const cartColorChange = () => {
    if (cartColor === 'grey') {
      setCartColor('blue')
    }else {
      setCartColor('grey')
    }
  }


  return (
    <>
    <Button className = 'loginButton' style = {{color: 'black', fontFamily: 'Nunito', fontWeight: 'bold', backgroundColor: 'transparent'}} onClick={handleOpen}>Item Details</Button>
    <Modal
    open={open}
    style={{background: 'transparent'}}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box className = 'showModal' sx = {style}>

    <Typography id="modal-modal-title" variant="h6" component="h2">
    <h2 className = 'showName'>{props.name}</h2>
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    <img className = 'modalImage' src = {props.image}></img>
    </Typography>

    <div className = 'showButtons'>
    <IconButton value="check"
    selected={selected}
    onChange={() => {
    setSelected(!selected);}}
    onClick = {heartColorChange}
    seletexaria-label="add to favorites">
        <FavoriteIcon style={{color: heartColor}}/>
       </IconButton>

       <IconButton value="check"
       selected={selected}
       onChange={() => {
       setSelected(!selected);}}
       onClick = {cartColorChange}
       seletexaria-label="add to cart">
      <AddShoppingCartIcon style={{color: cartColor}}/>
          </IconButton>
    </div>

      <Typography>
      <h4>Price:</h4><div className = 'showStuff'>{props.price}</div>
    </Typography>
    <Typography>
    <h4>Description:</h4><div className = 'showStuff'>{props.description}</div>
    </Typography>
    <Typography>
      <h4>Tags:</h4><div className = 'showStuff'>{props.tag}</div>
    </Typography><br/>
    <Typography>
      <br/><div className = 'showStuffBold'>{props.inStock}</div>
    </Typography>
    <Typography>
      <br/><div className = 'showStuffBold'>{props.delivery}</div>
    </Typography>
    </Box>
    </Modal>

  </>
  )
};

export default Show;
