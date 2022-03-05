import './App.css';
import {useState,useEffect} from 'react';
import CreateForm from "./pages/CreateForm"
import Groceries from "./pages/Groceries"
import Reviews from "./reviews/Reviews"
import Translate from "./pages/Translate"
import { render } from "react-dom";
import {
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom" ;
import Show from "./pages/Show"
import axios from 'axios'
import './css/home.css';
import Edit from "./pages/Edit"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const App = () => {
  const [filter, setFilter] = useState('')
  const [groceries, setGroceries] = useState([])

  useEffect(()=>{
    axios
    .get('https://stark-shelf-08940.herokuapp.com/groceries')
    .then((response)=>{
      setGroceries(response.data);
    })
  }, [])

  const handleDelete = (groceryData)=>{
    axios
    .delete(`https://stark-shelf-08940.herokuapp.com/groceries/${groceryData._id}`)
      .then(()=>{
        axios
        .get('https://stark-shelf-08940.herokuapp.com/groceries/')
        .then((response)=>{
          setGroceries(response.data)
        })
      })
    }

  return (
      <>
    <main>
      <div className = 'headerDiv'>
      <div className = 'logoDiv'>
      <div className = 'logoName'>
      <a className = 'logoAnchor' href = '/'><img className = 'logo' src = 'https://i.imgur.com/6cjbsLL.png'></img></a>
      <img src ='https://i.imgur.com/eprK5RZ.png' class = 'appName'></img>
      </div>

      </div>
      <nav className = 'navBar'>
      <Link className = 'link' to="/">Home</Link>
      <Link className = 'link' to="/review">Reviews</Link>
      <Link className = 'link' to="/new">Add Item</Link>

      <div id="google_translate_element"></div>
      </nav>
      </div>
    </main>


    <Routes>
    <Route path="/" element={<Groceries />}/>
    <Route path="/new" element={<CreateForm />}/>
    <Route path="/review" element={<Reviews />}/>
    </Routes>

    <footer>

      <ul className = 'footerUL'>

        <li  className = 'footerLI'>About</li>
        <li  className = 'footerLI'>Legal Terms</li>
        <li  className = 'footerLI'>Privacy Statement</li>
        <li  className = 'footerLI'>Customer Support</li>
        <li className = 'footerLI'>©2022 Seoul Sisters</li>
      </ul>

      <div className = 'socialIconsDiv'>
        <FacebookIcon className = 'socialIcon'style = {{color: '#4267B2'}}/>
        <InstagramIcon className = 'socialIcon' style = {{color: '#8a3ab9'}}/>
        <TwitterIcon className = 'socialIcon' style = {{color: '#00acee'}}/>
        <GitHubIcon className = 'socialIcon' style = {{color: '#171515'}}/>
        <LinkedInIcon className = 'socialIcon' style = {{color: '#0e76a8'}}/>
      </div>

      <div className = 'footerLogoDiv'>
      <img className = 'footerLogo' src = 'https://i.imgur.com/syW8iwL.png?1'></img>
      </div>

    </footer>


    </>
  )
}

export default App;
