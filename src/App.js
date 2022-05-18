import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Privateroute from './components/Auth/Privateroute';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Header from './components/Header';
import Todo from './components/Todo';

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Privateroute><Todo></Todo></Privateroute>}></Route>
        <Route path='/home' element={<Privateroute><Todo></Todo></Privateroute>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
      </Routes>
    </>
  );
};

export default App;