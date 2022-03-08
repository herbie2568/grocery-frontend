import './App.css';
import {useState,useEffect} from 'react';
import CreateForm from "./pages/CreateForm"
import Groceries from "./pages/Groceries"
import Reviews from "./reviews/Reviews"
import Translate from "./pages/Translate"
import {
  Redirect,
  BrowserRouter,
  Routes,
  Route,
  Link,
  Switch,
  useParams
} from "react-router-dom" ;
import Show from "./pages/Show"
import Cart from "./pages/Cart"
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
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Login from './pages/Login2'




const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: '#daf2df',
  border: '2px solid #eba743',
  p: 2,
  px: 4,
  pb: 3,
};


const App = () => {
  const [filter, setFilter] = useState('')
  const [groceries, setGroceries] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edit, setEdit] = useState('')
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState({})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  useEffect(()=>{
    axios
    .get('https://stark-shelf-08940.herokuapp.com/groceries')
    .then((response)=>{
      setGroceries(response.data);
    })
  }, [])
  const handleCreateUser = (event) => {
   event.preventDefault()
   setUsername('')
   setPassword('')
   axios.post('https://stark-shelf-08940.herokuapp.com/users/createaccount',
   {
     username: username,
     password: password
   })
   .then((response) => {
     if(response.data.username){
       setToggleError(false)
       setErrorMessage('')
       setCurrentUser(response.data)
       handleToggleLogout()
     } else {
       setErrorMessage(response.data)
       setToggleError(true)
     }
   })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    axios.put('https://stark-shelf-08940.herokuapp.com/users/login',
    {
      username: username,
      password: password
    })
    .then((response) => {
      console.log(response.data.username);

      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setToggleError(true)
        setErrorMessage(response.data)
      }
    }).then(() => {
      axios.get(`https://stark-shelf-08940.herokuapp.com/users/findOne/${username}`,
    ).then((res) => {
      setCurrentUser(res.data)
    })
    })
  }
  const handleLogout = () => {
  setUsername('')
  setPassword('')
  setCurrentUser({})
  handleToggleLogout()
  }

  const handleToggleForm = (event) => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }


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
            <img src ='https://i.imgur.com/eprK5RZ.png' className = 'appName'></img>
          </div>
          <div className = 'loginButtonDiv'>
          <Login setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
                handleCreateUser = {handleCreateUser}
                handleLogin = {handleLogin}
                handleLogout = {handleLogout}
                handleToggleForm = {handleToggleForm}
                handleToggleLogout = {handleToggleLogout}
                toggleLogin = {toggleLogin}
                toggleLogout = {toggleLogout}
                username = {username}
                 setUsername = {setUsername}
                 password = {password}
                 setPassword = {setPassword}
                 groceries = {groceries}
                 setGroceries = {setGroceries}
                 errorMessage = {errorMessage}
                 setErrorMessage = {setErrorMessage}
                 toggleError = {toggleError}
                 setToggleError = {setToggleError}/>
          </div>
        </div>
        <nav className = 'navBar'>
          <div className = 'navbarRight'>
            <Link className = 'link' to="/">Products</Link>
            <Link className = 'link' to="/review">Reviews</Link>


            <div>
            <>
              {currentUser.username ?

            <Link className = 'link3' to="/new">Add Item</Link>
            :
            null
          }
          </>
          </div>


          </div>
          <div id="google_translate_element"></div>
        </nav>
        </div>
      </main>

      <div className="wrapper">

      <Routes>
      <Route path="/" element={<Groceries currentUser = {currentUser} setCurrentUser = {setCurrentUser} />}/>
    <Route element={<Show groceries = {groceries} setGroceries = {setGroceries}/>}/>
      <Route path="/new" element={<CreateForm />}/>

      <Route path="/review" element={<Reviews />}/>

      <Route path="/cart" element={<Cart groceries = {groceries} setGroceries = {setGroceries}/>}/>
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
        <a href = '/'><img className = 'footerLogo' src = 'https://i.imgur.com/syW8iwL.png?1'></img></a>
      </div>
      <p className = 'bottomLine'>©Website made by <a href = 'https://www.linkedin.com/in/jiheekim03/'>Jihee Kim</a> and <a href = 'https://www.linkedin.com/in/lilychen910/'>Lily Chen</a></p>

      </footer>


      </>
    )
  }

  export default App;
