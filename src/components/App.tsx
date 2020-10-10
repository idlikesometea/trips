import React from 'react';
import Map from './Map';
import TripsList from './TripsList';

import './TripsList.css';

export default () => {

  return (
    <div>
      <Map />
      <div className="trips-list">
        <TripsList />
      </div>
    </div>
  );
}
