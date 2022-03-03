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
  import '../css/review.css';

const ReviewsForm = (props) => {
  const [reviews, setReviews] = useState([])
  const [newName, setNewName] = useState('')
  const [newSubject, setNewSubject] = useState('');
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('');


  const handleNewNameChange = (event)=>{
    setNewName(event.target.value);
  }
  const handleNewSubjectChange = (event)=>{
    setNewSubject(event.target.value);
  }

  const handleNewImageChange = (event)=>{
  setNewImage(event.target.value);
  }

  const handleNewDescriptionChange = (event)=>{
    setNewDescription(event.target.value);
  }

  const handleNewReviewFormSubmit = (event)=>{
      event.preventDefault();
      axios.post(
          'https://floating-crag-29031.herokuapp.com/reviews',
          {
              name:newName,
              subject:newSubject,
              image: newImage,
              description: newDescription
            }).then(()=>{
          axios
              .get('https://floating-crag-29031.herokuapp.com/reviews')
              .then((response)=>{
                  setReviews(response.data)
              })
          })
    }

return (
    <>
    <div className = 'review-form'>
    <h3>Write a review</h3>
    <form onSubmit={handleNewReviewFormSubmit}>
      Name: <input type = 'text' onChange={handleNewNameChange}/><br/>
      Subject: <input type = 'text' onChange={handleNewSubjectChange}/><br/>
      Image URL: <input type = 'text'  onChange={handleNewImageChange}/><br/>
      <div className = "textarea">
      Description: <br/> <textarea type = 'text' rows="4"
       onChange={handleNewDescriptionChange}/>
      </div><br/>
      <input type = 'submit' value = 'Post review'/>
      </form>
      </div>
    </>
  )
}

export default ReviewsForm
