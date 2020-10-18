import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';

interface Props {
    userLogged: boolean;
    userId: number;
    signIn: (userId:number) => void;
    signOut: () => void;
};


class Dashboard extends Component<Props> {

    render() {
        if (this.props.userLogged === false) {
            return (
                <div className="ui container">
                    <Login />
                </div>
            );
        } else if (this.props.userLogged) {
            return (
                <div className="ui container">
                    <div className="ui placeholder segment">
                        <div className="ui icon header">
                            <i className="world icon"></i>
                            You dont have a map yet, create your scratch map.
                        </div>
                        <Link to="/create-map" className="ui primary button">Create scratch map</Link>
                    </div>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(Dashboard);