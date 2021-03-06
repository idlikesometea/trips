import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import './Header.css';
import UserItem from './UserItem';
import GoogleAuth from '../Admin/GoogleAuth';

const Header = ({auth}) => {
    return (
        <Menu inverted id="app-menu" size="mini">
            <Menu.Item>
                {   auth.userLogged === false
                    ? <Link to="/creator">Create your map</Link>
                    : <Link to="/dashboard">Dashboard</Link>
                }
            </Menu.Item>
            <Menu.Item position="right">
                { !auth.userLogged
                    ? <GoogleAuth />
                    : <UserItem /> 
                }
            </Menu.Item>
            <Menu.Item>
                <a href="https://github.com/idlikesometea/trips" target="_blank" rel="noopener noreferrer">
                    <img alt="Github logo on external anchor" src="/github.png" />
                </a>
            </Menu.Item>
        </Menu>
    );
};

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);