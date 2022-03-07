import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import axios from 'axios'
import '../css/edit.css';
import EditIcon from '@mui/icons-material/Edit';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  };




const Edit = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newTag, setNewTag] = useState([])
  const [newDelivery, setNewDelivery] = useState(false)
  const [newStock, setNewStock] = useState(false);

  const handleNewNameChange = (event)=>{
    setNewName(event.target.value);
  }

  const handleNewDescriptionChange = (event)=>{
    setNewDescription(event.target.value);
  }

  const handleNewStockChange = (event)=>{
    setNewStock(event.target.checked);
   console.log(newStock)
  }

  const handleNewDeliveryChange = (event)=>{
  setNewDelivery(event.target.checked);
   console.log(newDelivery)
  }

  const handleNewTagChange = (event)=>{
  setNewTag(event.target.value);
  }

  const handleNewImageChange = (event)=>{
  setNewImage(event.target.value);
  }

  const handleNewPriceChange = (event)=>{
  setNewPrice(event.target.value);
  }

  const handleEditValue = (groceryData) => {
    setNewName(groceryData.name)
    setNewImage(groceryData.image)
    setNewDescription(groceryData.description)
    setNewPrice(groceryData.price)
    setNewTag(groceryData.tag)

  }


  const handleToggleEdit = (groceryData)=>{
      axios
          .put(
              `https://stark-shelf-08940.herokuapp.com/groceries/${groceryData?._id}`,
              {
                  name: newName,
                  image: newImage,
                  description:newDescription,
                  price: newPrice,
                  inStock: !newStock,
                  delivery: !newDelivery,
                  tag: newTag
              }
          )
          .then(()=>{
              axios
                  .get('https://stark-shelf-08940.herokuapp.com/groceries')
                  .then((response)=>{
                    props.setGroceries(response.data)
                  })
          })
  }

  return (
    <>
    <Grid item xs={3} className = 'editButton' onClick={handleOpen}>
      <EditIcon className = 'editIcon'/></Grid>
    <Modal
    open={open}
    style={{background: 'transparent'}}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
    <h2 className = 'editTitle'>Edit Item</h2>
    <div className = "edit-container">
    <form onSubmit={(e)=>{e.preventDefault();handleToggleEdit(props.grocery)}}>
    <input type = 'text' className = 'addInput' defaultValue = {props.grocery.name} placeholder = 'Item Name...' onChange={handleNewNameChange}/><br/>
    <input className = 'addInput' type = 'text' placeholder = 'Image URL...' defaultValue = {props.grocery.image} onChange={handleNewImageChange}/><br/>
    <input className = 'addInput' type = 'text' placeholder = 'Item Description...' defaultValue = {props.grocery.description} onChange={handleNewDescriptionChange}/><br/>
    <input className = 'addInput' type = 'text' placeholder = 'Price...' defaultValue = {props.grocery.price} onChange={handleNewPriceChange}/><br/>
    <input className = 'addInput' type = 'text' placeholder = 'Tags...' defaultValue = {props.grocery.tag} onChange={handleNewTagChange}/><br/>
    <div className = 'stockDelivery2'>
    <div className = 'stockCheck'>
    In Stock: <input className = 'checkbox' type = 'checkbox' onChange={handleNewStockChange}/>
    </div>
    <div className ='stockCheck'>
    Available for Delivery: <input className = 'checkbox' type = 'checkbox' onChange={handleNewDeliveryChange}/>
    </div>
    </div>
      <input className = 'submitButton' type = 'submit' value = 'Submit Changes' />
      </form>
      </div>
    </Typography>
    </Box>
    </Modal>

  </>
  )
};

export default Edit;
