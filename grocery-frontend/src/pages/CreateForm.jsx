import {useState, useEffect} from 'react';
import axios from 'axios'
import {render} from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import '../css/create.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const CreateForm = (props) => {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newStock, setNewStock] = useState(false);
  const [newTag, setNewTag] = useState([])
  const [newDelivery, setNewDelivery] = useState(false)
  const [groceries, setGroceries] = useState([])
  const [filter, setFilter] = useState('')

  const handleNewNameChange = (event)=>{
    setNewName(event.target.value);
  }

  const handleNewDescriptionChange = (event)=>{
    setNewDescription(event.target.value);
  }

  const handleNewStockChange = (event)=>{
  setNewStock(event.target.checked);
  }

  const handleNewDeliveryChange = (event)=>{
  setNewDelivery(event.target.checked);
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

  const handleNewGroceryFormSubmit = (event)=>{
      event.preventDefault();
      axios.post(
          'https://stark-shelf-08940.herokuapp.com/groceries',
          {
              name:newName,
              image: newImage,
              description: newDescription,
              price: newPrice,
              inStock:newStock,
              delivery: newDelivery,
              tag: newTag
          }).then(()=>{
          axios
              .get('https://stark-shelf-08940.herokuapp.com/groceries')
              .then((response)=>{
                  setGroceries(response.data)
              })
          })
    }

  return (
    <>
    <input className = 'searchInput2' type="text" placeholder="search..."
    ></input>
    <div className = 'new-container'>
    <h2>Add New Item</h2>
    <form className = 'addForm' onSubmit={handleNewGroceryFormSubmit}>
      <input type = 'text' className = 'addInput' placeholder = 'Item Name...' onChange={handleNewNameChange}/><br/>
      <input className = 'addInput' type = 'text' placeholder = 'Image URL...' onChange={handleNewImageChange}/><br/>
      <input className = 'addInput' type = 'text' placeholder = 'Item Description...' onChange={handleNewDescriptionChange}/><br/>
      <input className = 'addInput' type = 'text' placeholder = 'Price...' onChange={handleNewPriceChange}/><br/>
      <input className = 'addInput' type = 'text' placeholder = 'Tags...' onChange={handleNewTagChange}/><br/>
      <div className = 'stockDelivery'>
      <div className = 'stockCheck'>
      In Stock: <input className = 'checkbox' type = 'checkbox' onChange={handleNewStockChange}/>
      </div>
      <div className ='stockCheck'>
      Available for Delivery: <input className = 'checkbox' type = 'checkbox' onChange={handleNewDeliveryChange}/>
      </div>
      </div>

      <input className = 'submitButton' type = 'submit' value = 'Add Item' />
      </form>
      </div>


  </>
  )
};

export default CreateForm;
