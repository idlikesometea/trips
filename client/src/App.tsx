import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Nav/Header';
import Dashboard from './components/Admin/Dashboard/Index';
import Landing from './components/Admin/Landing';
import Map from './components/Map/Map';
import NotFound from './components/Nav/404';
import Creator from './components/Admin/Creator/Index';

import './App.css';

export default () => {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/m/:id" component={Map}></Route>
        <Route path="/creator" component={Creator}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}
