import React, { useEffect, useState } from 'react';
import Map from './Map';
import TripsList from './TripsList';

export default () => {
  const [trip, setTrip] = useState({});

  return (
    <div>
      <Map trip={trip} />
      <TripsList onTripSelect={setTrip} />
    </div>
  );
}
