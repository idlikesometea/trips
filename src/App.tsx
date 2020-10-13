import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header';
import Dashboard from './components/Admin/Dashboard';
import Map from './components/Map/Map';
import Login from './components/Admin/Login';
// import Message from './components/ui/Message';


export default () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/map" component={Map}></Route>
        <Route path="/login" component={Login}></Route>
      </BrowserRouter>
      {/* <Message /> */}
    </div>
  );
}
