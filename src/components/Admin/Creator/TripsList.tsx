import React from 'react';
import { Link } from 'react-router-dom';

import Trip from '../../../models/Trips.model';

export default ({trips}: {trips:Trip[]}) => {
    const tripsList = trips.map(trip => {
        return (
            <div key={trip.id} className="item">
                <div className="right floated content">
                    <Link to={`trip/${trip.id}`} className="ui button">Update</Link>
                </div>
                <img alt="Trip thumbnail selected by user" className="ui avatar image" src="https://img.huffingtonpost.com/asset/5e1d9c4c2100003000af8d0c.jpeg?cache=5aaxY3NirQ&ops=scalefit_720_noupscale" />
                <div className="content">
                    <div className="header">{trip.name}</div>
                </div>
            </div>
        );
    })

    return (
        <div className="ui segment">
            { trips.length
                ? <div className="ui huge aligned divided list">{tripsList}</div>
                : <h1>You don't have any trips yet</h1>
            }

            <Link to="trip" className="ui button primary">Add a trip</Link>
        </div>
    );
};