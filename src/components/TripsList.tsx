import React from 'react';

import './TripsList.css';
import Trip from '../models/Trips.model';

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