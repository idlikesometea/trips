import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import './TripsList.css';
import Trip from '../models/Trips.model';
import { fetchTrips } from '../actions';


const TripsList = ({onTripSelect, trips, loading}) => {
	const [activeTrip, setActiveTrip] = useState<Trip>({});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTrips(3));
	}, [dispatch]);

	const tripsList = trips.map((trip:Trip, index) => {
		return (
			<li key={index} onClick={() => {onTripSelect(trip);setActiveTrip(trip)}}>
				{trip.name}
			</li>
		);
	});

	const tripSelected = (
		<div>
			<button onClick={() => {setActiveTrip({})}}>X</button>
			<p> {activeTrip.name} </p>
		</div>
	);

	if (loading) {
		return (
			<div className="trips-list">
				<h3>Loading</h3>
			</div>
		)
	}

	return (
		<div className="trips-list">
			<ul>
				{ activeTrip.name
					? ( tripSelected )
					: ( tripsList ) 
				}
			</ul>
		</div>
	);
}

const mapStateToProps = state => {
	return { trips: state.trips.data, loading: state.trips.loading }
};

export default connect(mapStateToProps, {
	fetchTrips
})(TripsList);