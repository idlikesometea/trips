import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="ui placeholder segment">
        <div className="ui icon header">
            <i className="world icon"></i>
            You dont have a map yet, create your scratch map.
        </div>
        <Link to="/creator" className="ui primary button">Create scratch map</Link>
    </div>
    );
};