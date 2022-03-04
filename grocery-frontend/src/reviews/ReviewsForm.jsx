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
    <form className = 'reviewForm2' onSubmit={handleNewReviewFormSubmit}>
      <input type = 'text' placeholder = 'Name...' className = 'addInput2' onChange={handleNewNameChange}/><br/>
      <input type = 'text' placeholder = 'Subject...' className = 'addInput2' onChange={handleNewSubjectChange}/><br/>
      <input type = 'text' placeholder = 'Image URL...' className = 'addInput2'  onChange={handleNewImageChange}/><br/>

      <textarea placeholder = 'Write a review...' className = 'addInput2' type = 'text' rows="4"
       onChange={handleNewDescriptionChange}/>
      <br/>
      <input className = 'submitButton' type = 'submit' value = 'Post review'/>
      </form>
      </div>
    </>
  )
}

export default ReviewsForm
