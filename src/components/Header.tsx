import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default () => {
    return (
        <div id="map-menu" className="ui secondary pointing menu">
            <Link to="/map" className="item">Trips</Link>
            <div className="right menu">
                <Link to="/" className="item">Dashboard</Link>
                <Link to="/login" className="item">Log In</Link>
                <a href="https://github.com/idlikesometea/trips" target="_blank" rel="noopener noreferrer" className="item">
                    <i className="github icon"></i>
                 </a>
            </div>
        </div>
    )
};