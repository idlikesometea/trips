import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { tripStateProps } from '../../models/Trips.model';
import { selectTrip, resetTrip } from '../../state/actions';
import './TripsSelector.css';
import Loader from '../ui/Loader';

const TripsSelector = ({state}: tripStateProps) => {
	const dispatch = useDispatch();

	const tripsList = state.trips.map((trip) => {
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
			<p> {state.selectedTrip.name} </p>
		</div>
	);

	return (
		<div className="trips-selector">
			{ state.selectedTrip.name
				? ( tripSelected )
				: ( state.loadingTrips || state.loadingTrip )
					? null
					: (<ul> { tripsList } </ul>)
			}
			{ state.loadingTrips || state.loadingTrip
				? <Loader text="Loading" />
				: null
			}
		</div>
	);
}

const mapStateToProps = state => {
	return { 
		state: {
			trips: state.map.trips, 
			selectedTrip: state.trip.trip,
			loadingTrips: state.map.loading,
			loadingTrip: state.trip.loading
		}
	}
};

export default connect(mapStateToProps, {
	selectTrip,
	resetTrip
})(TripsSelector);