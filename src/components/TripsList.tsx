import React from 'react';

import './TripsList.css';
import Trip from '../models/Trips.model';

const trips = [
    {name: 'Italia 2017'},
    {name: 'NYC - Spain 2019'},
    {name: 'Eurotrip 2018'}, 
  ];
  


const TripsList = ({trips, onTripsChange}: {trips:Trip[], onTripsChange:any}) => {
    const tripsList = trips.map((trip, index) => {
        return (
            <li key={index} onClick={() => {onTripsChange(trip)}}>
                {trip.name}
            </li>
        );
    });

    return (
        <div className="trips-list">
            <ul>
                {tripsList}
            </ul>
        </div>
    );
}

export default TripsList;