import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Trip } from '../../models/Trips.model';
import { fetchTrips, selectTrip, resetTrip } from '../../actions';
import './TripsSelector.css';
import Loader from '../ui/Loader';

const TripsSelector = ({trips, loadingTrips, selectedTrip, loadingTrip}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTrips());
	}, [dispatch]);

	const tripsList = trips.map((trip:Trip) => {
		return (
			<li key={trip.id} onClick={() => {dispatch(selectTrip(trip.id))}}>
				{trip.name}
			</li>
		);
	});

	const tripSelected = (
		<div className="active-trip">
			<button className="circular ui icon button" onClick={() => dispatch(resetTrip())}>
  				<i className="icon angle left"></i>
			</button>
			<p> {selectedTrip.name} </p>
		</div>
	);

	return (
		<div className="trips-selector">
			{ selectedTrip.name
				? ( tripSelected )
				: ( loadingTrips || loadingTrip )
					? null
					: (<ul> { tripsList } </ul>)
			}
			{ loadingTrips || loadingTrip
				? <Loader text="Loading" />
				: null
			}
		</div>
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
})(TripsSelector);