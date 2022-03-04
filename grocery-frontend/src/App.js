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
  const [filter, setFilter] = useState('')

  return (
      <>
    <main>
      <div className = 'headerDiv'>
      <div className = 'logoDiv'>
      <div className = 'logoName'>
      <a className = 'logoAnchor' href = '/'><img className = 'logo' src = 'https://i.imgur.com/6cjbsLL.png'></img></a>
      <h1 class = 'appName'>Seoul Sisters</h1>
      </div>
      <input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => {e.preventDefault(); setFilter(e.target.value);
      }}
      ></input>
      </div>
      <nav className = 'navBar'>
      <Link className = 'link' to="/">Home</Link>
      <Link className = 'link' to="/new">Add</Link>
      <Link className = 'link' to="/review">Review</Link>
      <div id="google_translate_element"></div>
      </nav>
      </div>

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
