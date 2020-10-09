import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import './TripsList.css';
import Trip from '../models/Trips.model';
import { fetchTrips, selectTrip, resetTrip } from '../actions';


const TripsList = ({trips, loading, activeTrip}) => {
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
	return { 
		trips: state.trips.data, 
		activeTrip: state.trips.activeTrip,
		loading: state.trips.loading
	}
};

export default connect(mapStateToProps, {
	fetchTrips,
	selectTrip,
	resetTrip
})(TripsList);