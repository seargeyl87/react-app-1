import React, { useEffect } from 'react';
import {useState} from 'react';
import './style/App.css';
import {
  BrowserRouter,
} from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import {AuthContext} from './context/index';


function App() {
  let [isAuth, setIsAunt] = useState(false);
  let [isLoading, setLoading] = useState(true);

useEffect( () => {

  if (localStorage.getItem('auth')) {
    setIsAunt(true)
  }
  setLoading(false);
}, [])

  return (
    <React.StrictMode>
    <AuthContext.Provider value={{
      isAuth: isAuth,
      setIsAunt: setIsAunt,
      isLoading: isLoading
    }}>
      
         <BrowserRouter>
           
           <Navbar/>
           <AppRouter/>
       </BrowserRouter>
    </AuthContext.Provider>
    </React.StrictMode>
  )
}

export default App;
