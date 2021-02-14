import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { Props } from '../../../models/Dashboard.model';
import { fetchGenerals, fetchMaps, fetchStats } from '../../../state/actions';

import Loader from '../../ui/Loader';
import Maps from './Maps';

class Dashboard extends Component<Props> {

    componentDidMount() {
        this.props.fetchGenerals();
        this.props.fetchStats();
        this.props.fetchMaps();
    }

    renderGeneralInformation() {
        return (
            <div className="ui segment">
                <h1>Welcome {this.props.auth.user.givenName}!</h1>
                <img alt="User profile avatar" className="ui avatar tiny image" src={this.props.auth.user.imageUrl} />
            </div>
        )
    }

    renderStats() {
        return (
            <div>
                <h1>Stats</h1>
                Some stats
            </div>
        );
    }

    render() {
        if (this.props.auth.userLogged === null) {
            return <Loader />;
        }

        if (this.props.auth.userLogged === false) {
            return <Redirect to="/" />
        }

        return (
            <div className="ui container">
                { this.renderGeneralInformation() }
                <Maps props={{
                    maps: this.props.dashboard.maps, 
                    loading: this.props.dashboard.loading.maps, 
                    errorMsg: this.props.dashboard.errorMessage.maps}} 
                />
                { this.renderStats() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        dashboard: state.dashboard
    }
};

export default connect(mapStateToProps, {
    fetchGenerals,
    fetchStats,
    fetchMaps
})(Dashboard);