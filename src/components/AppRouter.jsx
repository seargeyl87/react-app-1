import React, { useContext } from 'react';
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import Login from "../pages/Login";
import {
    Routes,
    Route,
  } from 'react-router-dom';
import PostIdPage from '../pages/PostIdPage';
import {AuthContext} from '../context/index';
import Loader from './UI/Loader/Loader';


let AppRouter = () => {
  let {isAuth, isLoading} = useContext(AuthContext);

if(isLoading) {
  return <Loader/>
}
    return (
        isAuth ?   

<div>
  <Routes>
    <Route path='/about' element={<About/>} />
    <Route path='/posts' element={<Posts/>} />
    <Route path='*' element={<Error/>} />
    <Route path="/posts/:id" element={<PostIdPage/>}/>
    <Route path='/' element={<Posts/>} />
  </Routes>
</div>
:

<div>
  <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='*' element={<Login/>} />
  </Routes>
</div>


    )
};

export default AppRouter;