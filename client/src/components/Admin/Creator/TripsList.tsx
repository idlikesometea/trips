import React from 'react';
import { Link } from 'react-router-dom';
import { Map } from '../../../models/Creator.model';

import { Trip } from '../../../models/Trips.model';
import './TripsList.css';

export default ({trips, map}: {trips:Trip[], map:Map}) => {

    if (map.name === '') {
        return (
            <div className="ui segment">
                <h2>Your trips</h2>
                <h4>Create a map to add your first trip.</h4>
            </div>
        )
    }

    const tripsList = trips.map(trip => {
        return (
            <div key={trip.id} className="item">
                <div className="right floated content">
                    <Link to={`/creator/trip/${trip.id}`} className="ui icon circular button">
                        <i className="icon settings"></i>
                    </Link>
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
            <h2>Your trips</h2>
            <div className="trips-list">
                { trips.length
                    ? <div className="ui huge aligned divided list"> {tripsList} </div>
                    : <h1>You don't have any trips yet</h1>
                }
            </div>
            <Link to="/creator/trip/" className="ui button primary">Add a trip</Link>
        </div>
    );
};