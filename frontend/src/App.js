import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
