import React, { useEffect, useState } from 'react';

import './TripsList.css';
import api from '../services/api';
import Trip from '../models/Trips.model';


const TripsList = ({onTripSelect}) => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
			api.get('/trips/3')
				.then(response => {
					setTrips(response.data.data);
				});
    }, []);

    const tripsList = trips.map((trip:Trip, index) => {
			return (
				<li key={index} onClick={() => {onTripSelect(trip)}}>
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