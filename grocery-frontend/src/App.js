import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {render} from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState, useEffect} from 'react';
import Show from "./pages/Show"







const App = () => {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newStock, setNewStock] = useState(false);
  const [newTag, setNewTag] = useState([])
  const [newDelivery, setNewDelivery] = useState(false)
  const [groceries, setGroceries] = useState([])




  useEffect(()=>{
  axios
      .get('http://localhost:3000/groceries')
      .then((response)=>{
        setGroceries(response.data);
      })
  },[])



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
        'http://localhost:3000/groceries',
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
            .get('http://localhost:3000/groceries')
            .then((response)=>{
                setGroceries(response.data)
            })
        })
  }

  const handleDelete = (groceryData)=>{
    axios
        .delete(`http://localhost:3000/groceries/${groceryData._id}`)
        .then(()=>{
            axios
                .get('http://localhost:3000/groceries')
                .then((response)=>{
                    setGroceries(response.data)
                })
        })
}

const handleToggleStock = (groceryData)=>{
    axios
        .put(
            `http://localhost:3000/groceries/${groceryData._id}`,
            {
                name: groceryData.name,
                image: groceryData.image,
                description:groceryData.description,
                price: groceryData.price,
                inStock:!groceryData.inStock,
                delivery: !groceryData.delivery,
                tag: groceryData.tag
            }
        )
        .then(()=>{
            axios
                .get('http://localhost:3000/groceries')
                .then((response)=>{
                    setGroceries(response.data)
                })
        })
}

const showItem = () => {

}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  return (
    <>

    <main>
      <h1>Lily and Jihee GROCERY</h1>
      <section>
      <h2>Browse groceries</h2>
      <ul className = 'groceryContainer'>
          {
              groceries.map((grocery)=>{
                  return <div key = {grocery._id} >
                  <div className = 'groceryDiv'>
                  {<li className = 'groceryName'>{grocery.name}</li>}

                  {<img src = {grocery.image} />}


                  <Show name = {grocery.name} image = {grocery.image} />


                  {<li className = 'descriptionLI'>{grocery.description}</li>}
                  <div className = 'priceStock'>
                  {<li>Price: {grocery.price}</li>}

                  {grocery.inStock ? <li>In Stock</li> : <li>Out of Stock</li>}
                  {<li>{grocery.tag}</li>}
                  </div>

              <button onClick={ (event)=>{ handleDelete(grocery) } }>Delete</button>

              <div>

              </div>
                  </div>

                  </div>

              })
          }
      </ul>
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
      </section>
    </main>
    </>
  )
}




export default App;
