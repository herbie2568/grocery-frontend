

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


const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [newName, setNewName] = useState('')
  const [newSubject, setNewSubject] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('');

  useEffect(()=>{
    axios
    .get('http://localhost:3000/reviews/')
    .then((response)=>{
      setReviews(response.data);
    })
  },[reviews])



  const handleDelete = (reviewData)=>{
    axios
    .delete(`http://localhost:3000/reviews/${reviewData._id}`)
      .then(()=>{
        axios
        .get('http://localhost:3000/reviews/')
        .then((response)=>{
          setReviews(response.data)
        })
      })
    }

    return (
      <>
      <div className = 'reviewDiv'>
      <h2>Review</h2>
      <div className = "review-container">

      <div className = "info-container">
      {
        reviews.map((review)=>{
          return <div key = {review._id} >
          {<h3>Name: {review.name}</h3>}
          {<h4>Subject: {review.subject}</h4>}
          {<li>Image: <img src = {review.image}/></li>}
          {<li>Description: {review.description}</li>}
          <button onClick={ (event)=>{ handleDelete(review) } }>Delete</button>

          </div>
        })
      }
      <ReviewsForm/>
      </div>
      </div>
      </div>
      </>
    )
  }

  export default Reviews
