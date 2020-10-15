import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './Admin/GoogleAuth';

class UserItem extends React.Component {
    render() {
        return (  
            <div className="ui simple dropdown item">
                User <i className="dropdown icon"></i>
                <div className="menu">
                    <Link to="/" className="item">Dashboard</Link>
                    <GoogleAuth />
                </div>
            </div>
        );
    }
}

export default UserItem;