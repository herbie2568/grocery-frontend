import './App.css';
import {useState} from 'react';
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

const App = () => {

  return (
      <>
    <main>
      <div className = 'logoDiv'>
      <a className = 'logoAnchor' href = '/'><img className = 'logo' src = 'https://i.imgur.com/6cjbsLL.png'></img></a>
      <h1 class = 'appName'>Seoul Sisters</h1>
      </div>
      <nav>
      <Link to="/">Home</Link>
      <Link to="/new">Add</Link>
      <Link to="/review">Review</Link>
      <div id="google_translate_element"></div>

      </nav>
    </main>
    <Routes>
    <Route path="/" element={<Groceries />}/>
    <Route path="/new" element={<CreateForm />}/>
    <Route path="/review" element={<Reviews />}/>
    </Routes>

    </>
  )
}

export default App;
