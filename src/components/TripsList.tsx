import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import Trip from '../models/Trips.model';
import { fetchTrips, selectTrip, resetTrip } from '../actions';


const TripsList = ({trips, loadingTrips, selectedTrip, loadingTrip}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTrips(3));
	}, [dispatch]);

	const tripsList = trips.map((trip:Trip) => {
		return (
			<li key={trip.id} onClick={() => {dispatch(selectTrip(trip.id))}}>
				{trip.name}
			</li>
		);
	});

	const tripSelected = (
		<div>
			<button onClick={() => dispatch(resetTrip())}>X</button>
			<p> {selectedTrip.name} </p>
		</div>
	);

	if (loadingTrips) {
		return <h3>Loading</h3>
	}

	if (loadingTrip) {
		return (
			<div>
				{ tripSelected }
				<h3>Loading pictures</h3>
			</div>
		)
	}

	return (
		<ul>
			{ selectedTrip.name
				? ( tripSelected )
				: ( tripsList ) 
			}
		</ul>
	);
}

const mapStateToProps = state => {
	return { 
		trips: state.trips.trips, 
		selectedTrip: state.trips.trip,
		loadingTrips: state.trips.loadingTrips,
		loadingTrip: state.trips.loadingTrip
	}
};

export default connect(mapStateToProps, {
	fetchTrips,
	selectTrip,
	resetTrip
})(TripsList);