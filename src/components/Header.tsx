import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';
import UserItem from './UserItem';
import GoogleAuth from './Admin/GoogleAuth';

const Header = ({auth}) => {
    return (
        <div id="map-menu" className="ui secondary pointing menu">
            <Link to="/m/3er44r45454hgj56j45" className="item">Trips</Link>
            <div className="right menu">
                { !auth.userLogged ? <Link className="item" to="/">Create your map</Link> : null }
                { !auth.userLogged
                    ? <GoogleAuth />
                    : <UserItem />
                }
                <a href="https://github.com/idlikesometea/trips" target="_blank" rel="noopener noreferrer" className="item">
                    <i className="github icon"></i>
                 </a>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);