import './App.css';
import axios from 'axios'
import {render} from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState, useEffect} from 'react';
import Show from "./pages/Show"
import CreateForm from "./pages/CreateForm"
import EditForm from "./pages/EditForm"



const App = () => {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newStock, setNewStock] = useState(false);
  const [newTag, setNewTag] = useState([])
  const [newDelivery, setNewDelivery] = useState(false)
  const [groceries, setGroceries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
  axios
      .get('https://stark-shelf-08940.herokuapp.com/groceries')
      .then((response)=>{
        setGroceries(response.data);
      })
  },[])


  const handleDelete = (groceryData)=>{
    axios
        .delete(`https://stark-shelf-08940.herokuapp.com/groceries/${groceryData._id}`)
        .then(()=>{
            axios
                .get('https://stark-shelf-08940.herokuapp.com/groceries')
                .then((response)=>{
                    setGroceries(response.data)
                })
        })
}


  return (
      <>

    <main>
      <div className = 'header'>
      <h1>Lily and Jihee GROCERY</h1>
      <div className = 'searchBar'>
      <input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => {e.preventDefault(); setFilter(e.target.value);
          }}
        ></input><br/>
        </div>
      </div>
      <section>
      <h2>Browse groceries</h2>

      <div className = 'groceryContainer'>
          {
              groceries.filter((search) =>
        search.name.toLowerCase().includes(filter.toLowerCase())).map((grocery)=>{
                  return <div key = {grocery._id} >
                  <div className = 'groceryDiv'>
                  {<li className = 'groceryName'>{grocery.name}</li>}

                  {<img src = {grocery.image} />}


                  <Show name = {grocery.name} image = {grocery.image}
                        description = {grocery.description}
                        tag = {grocery.tag}
                        inStock = {grocery.inStock ? <li>In Stock</li> : <li>Out of Stock</li>}/>

              <button onClick={ (event)=>{ handleDelete(grocery) } }>Delete</button>

              <div>

              </div>
            </div>

          </div>

              })
          }
      </div>
      <CreateForm />
      <EditForm/>
      </section>
    </main>
    </>
  )
}

export default App;
