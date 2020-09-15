import React from 'react';

const TripsList = ({trips, onTripsChange}) => {
    const tripsList = trips.map((trip, index) => {
        return (
            <li key={index}>
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