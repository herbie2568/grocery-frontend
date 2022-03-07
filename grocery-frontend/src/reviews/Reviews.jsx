

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
import App from "../App";
import '../css/review.css';
import ReviewsForm from "./ReviewsForm";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [newName, setNewName] = useState('')
  const [newSubject, setNewSubject] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    axios
    .get('http://localhost:3000/reviews/')
    .then((response)=>{
      setReviews(response.data);
    })
  },[reviews])



  const handleDelete = (reviewData)=>{
    axios
    .delete(`https://floating-crag-29031.herokuapp.com/reviews/${reviewData._id}`)
      .then(()=>{
        axios
        .get('https://floating-crag-29031.herokuapp.com/reviews/')
        .then((response)=>{
          setReviews(response.data)
        })
      })
    }

    return (
      <>
      <div className = 'searchDiv'>
      <input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => {e.preventDefault(); setFilter(e.target.value);
      }}
      ></input>
      <img className = 'search-picshow' src = 'https://www.freeiconspng.com/thumbs/magnifying-glass-icon/magnifying-glass-icon-13.png'></img>
      </div>

      <div className = 'reviewDiv'>
      <h2>Reviews</h2>
      <div className = "review-container">

      <div className = "info-container">
      {
        reviews.filter((search) =>
        search.name.toLowerCase().includes(filter.toLowerCase())).map((review)=>{

          if (!review.image) {
            review.image = 'https://i.imgur.com/KH2GvHe.png'
          }
          return <div className = 'reviewContainer' key = {review._id} >
          {<h3>Name: {review.name}</h3>}
          {<h4>Subject: {review.subject}</h4>}
          {<li><img className = 'reviewImage' src = {review.image}/></li>}
          {<li className = 'reviewDescription'> {review.description}</li>}<br/>
          <div onClick={ (event)=>{ handleDelete(review) } }><DeleteRoundedIcon className = 'trashIcon'/></div>

          </div>
        })
      }

      </div>
      <ReviewsForm/>
      </div>
      </div>

      </>
    )
  }

  export default Reviews
