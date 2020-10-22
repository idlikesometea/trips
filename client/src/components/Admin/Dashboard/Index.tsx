import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { User } from '../../../models/Auth.model';
import api from '../../../services/api';
import Loader from '../../ui/Loader';
import Login from './Login';
import Placeholder from './Placeholder';

interface Props {
    userLogged: boolean;
    user: User
};

const initialState = {
    hasMap: null,
    map: null,
    trips: []
};

class Dashboard extends Component<Props> {
    state = {...initialState};

    async fetchUserData() {
        console.log('::Dashboard:fetching > userData');
        this.setState({hasMap: false});
        const response = await api.get(`user/${this.props.user.id}`);
        this.setState({map: response.data.map, trips: response.data.trips, hasMap:true});
    }

    componentDidMount() {
        if (this.props.userLogged && this.state.hasMap === null) {
            this.fetchUserData();
        }        
    }

    componentDidUpdate() {
        if (this.props.userLogged && this.state.hasMap === null) {
            this.fetchUserData();
        }
    }

    renderDashboard() {
        if (this.props.userLogged === null) {
            return <Loader />;
        } else if (!this.props.userLogged) {
            return <Login />;
        }

        if (this.props.userLogged) {
            if (this.state.hasMap) {
                return (
                    <div className="ui segment">
                        <h1>Welcome {this.props.user.givenName}!</h1>
                        <img alt="User profile avatar" className="ui avatar tiny image" src={this.props.user.imageUrl} />
                        <h2>You have created a map</h2>
                        <Link className="ui button primary" to="creator/">Update your map</Link>

                        <Link className="ui button green" style={{float:'right'}} to="m/3f4sdf4234234">See your map</Link>
                    </div>
                )
            } else {
                return <Placeholder />;
            }
        }
        return <Loader />;
    }

    render() {
        return <div className="ui container">{ this.renderDashboard() }</div>
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(Dashboard);