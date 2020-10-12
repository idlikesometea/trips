import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/Header';
import Map from './components/Map/Map';

export default () => {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route path="/map" component={Map}></Route>
      </BrowserRouter>
    </div>
  );
}
