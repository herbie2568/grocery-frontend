import {useState, useEffect} from 'react';
import axios from 'axios'


const CreateForm = (props) => {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newStock, setNewStock] = useState(false);
  const [newTag, setNewTag] = useState([])
  const [newDelivery, setNewDelivery] = useState(false)
  const [groceries, setGroceries] = useState([])
  

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
    <h2>Create a grocery</h2>
    <form onSubmit={handleNewGroceryFormSubmit}>
      Name: <input type = 'text' onChange={handleNewNameChange}/><br/>
      Image URL: <input type = 'text' onChange={handleNewImageChange}/><br/>
      Description: <input type = 'text' onChange={handleNewDescriptionChange}/><br/>
      Price: <input type = 'text' onChange={handleNewPriceChange}/><br/>
      In Stock: <input type = 'checkbox' onChange={handleNewStockChange}/><br/>
      Available for Delivery: <input type = 'checkbox' onChange={handleNewDeliveryChange}/><br/>
      <input type = 'submit' value = 'Add grocery' />
      </form>
  </>
  )

};

export default CreateForm;
