import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default () => {
    return (
        <div id="map-menu" className="ui secondary pointing menu">
            <Link to="/" className="item">Trips</Link>
            <div className="right menu">
                <Link to="/admin" className="item">Admin</Link>
            </div>
        </div>
    )
};