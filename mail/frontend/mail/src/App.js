
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Compose from './components/Compose';
import Inbox from './components/Inbox';
import Sent from './components/Sent';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Singleview from './components/Singleview';


function App() {
  return (
    <div >
          <Router>
            
            <Routes>
              <Route path = '/register' exact element = {<Register/>} />
              <Route path = '/' exact element = {<Home/>} />
              <Route path = '/inbox' exact element = {<Inbox/>} />
              <Route path = '/sent' exact element = {<Sent/>} />
              <Route path = '/compose' exact element={<Compose/>} />
              <Route path = '/singleview/:id'  element = {<Singleview/>} />
            </Routes>
          </Router> 
      
    </div>
  )
}



const Home = () => {
  return (
    <Login/>
    
  )
}


export default App;
