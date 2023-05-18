import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './Components/Authentication/Login'
import Signup from './Components/Authentication/Signup'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/signup" element={<Signup/>} exact/>
        <Route path="/login" element={<Login />} exact/>
      </Routes>
    </div>
  );
}

export default App;
