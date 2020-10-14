import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header';
import Dashboard from './components/Admin/Dashboard';
import Map from './components/Map/Map';
import NotFound from './components/404';
// import Message from './components/ui/Message';


export default () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/m/:id" component={Map}></Route>
        <Route component={NotFound}></Route>
      </BrowserRouter>
      {/* <Message /> */}
    </div>
  );
}
