import React, { Component } from 'react';

import { connect } from 'react-redux';
import Login from './Login';

interface Props {
    userLogged: boolean;
    userId: number;
    signIn: (userId:number) => void;
    signOut: () => void;
};


class Dashboard extends Component<Props> {
    render() {
        if (!this.props.userLogged) {
            return (
                <div className="ui container">
                    <Login />
                </div>
            );
        }
        
        return <div>Dashboard</div>
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(Dashboard);