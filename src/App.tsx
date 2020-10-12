import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header';
import Dashboard from './components/Admin/Dashboard';
import Map from './components/Map/Map';
import Message from './components/ui/Message';


export default () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Map}></Route>
        <Route path="/admin" component={Dashboard}></Route>
      </BrowserRouter>
      {/* <Message /> */}
    </div>
  );
}
