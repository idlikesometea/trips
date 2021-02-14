import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="ui placeholder segment">
            <div className="ui icon header">
                <i className="world icon"></i>
                You don't have any maps yet, create your first map!
            </div>
            <Link to="/creator" className="ui primary button">Create map</Link>
        </div>
    );
};