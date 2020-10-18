import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header';
import Dashboard from './components/Admin/Dashboard';
import Map from './components/Map/Map';
import NotFound from './components/404';
import CreateMap from './components/Admin/CreateMap';
// import Message from './components/ui/Message';

import './App.css';


export default () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/m/:id" component={Map}></Route>
          <Route path="/creator/:id?" component={CreateMap}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
      {/* <Message /> */}
    </div>
  );
}
