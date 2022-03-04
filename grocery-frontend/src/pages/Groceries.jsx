import {useState, useEffect} from 'react';
import Show from "./Show"
import axios from 'axios'
import '../css/home.css';
import Edit from "./Edit"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';



const Groceries = () => {
  const [filter, setFilter] = useState('')
  const [groceries, setGroceries] = useState([])

  useEffect(()=>{
    axios
    .get('http://localhost:3000/groceries/')
    .then((response)=>{
      setGroceries(response.data);
    })
  }, [])

  const handleDelete = (groceryData)=>{
    axios
    .delete(`http://localhost:3000/groceries/${groceryData._id}`)
      .then(()=>{
        axios
        .get('http://localhost:3000/groceries/')
        .then((response)=>{
          setGroceries(response.data)
        })
      })
    }

    return (
      <>
      <input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => {e.preventDefault(); setFilter(e.target.value);
      }}
      ></input>

      <section class = 'body'>
      <div className = 'middleImageDiv'>
      <img className = 'middleImage' src = 'https://i.imgur.com/LV87Nfn.png'></img>
      </div>

      <div className = 'groceryContainerDiv'>
        <h2 className = 'ourProducts'>Our Products</h2>
      <div className = 'groceryContainer'>
      {
        groceries.filter((search) =>
        search.name.toLowerCase().includes(filter.toLowerCase())).map((grocery)=>{
          return (<div key = {grocery._id} >
          <div className = 'groceryDiv'>
          {<li className = 'groceryName'>{grocery.name}</li>}

          {<img src = {grocery.image} />}
          {<li className = 'groceryPrice'>{grocery.price}</li>}

          <div className = "buttons">
          <Show name = {grocery.name} image = {grocery.image}
          description = {grocery.description}
          tag = {grocery.tag}
          inStock = {grocery.inStock ? <li>Out of Stock</li> : <li>In Stock</li>}
          delivery = {grocery.delivery ? <li>Delivery: Unavailable</li> : <li>Delivery: Available</li>}/>

          <Edit setGroceries={setGroceries} groceries={groceries} grocery={grocery}/>

          <Grid>
          <Grid item xs={8}>
          <div className = "trashcan" onClick={ (event)=>{ handleDelete(grocery) } }> <DeleteRoundedIcon className = 'trashIcon'/></div>
          </Grid>
          </Grid>
          </div>
          </div>
          </div>
          )
        })
      }
      </div>
      </div>
      </section>
      </>
    )
  }

  export default Groceries
