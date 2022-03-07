import React from 'react'
import {useState,useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Switch,
  useParams
} from "react-router-dom" ;
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from 'axios'
import CreateForm from "./pages/CreateForm"
import Groceries from "./pages/Groceries"
import Reviews from "./reviews/Reviews"




const Home = () => {
  const [groceries, setGroceries] = useState([])


  useEffect(()=>{
    axios
    .get('https://stark-shelf-08940.herokuapp.com/groceries')
    .then((response)=>{
      setGroceries(response.data);
    })
  }, [])
  return (
    <>



    <div className="wrapper">
      <h1>App</h1>
      <Routes>
      <Route path="/groceries" element={<Groceries />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/new" element={<CreateForm />}/>
      <Route path="/review" element={<Reviews />}/>
      </Routes>

    </div>


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
      <p className = 'bottomLine'>©Website made by <a href = 'https://www.linkedin.com/in/jiheekim03/'>Jihee Kim</a> and <a href = 'https://www.linkedin.com/in/lilychen910/'>Lily Chen</a></p>

    </footer>

    </>
  )
}

export default Home
