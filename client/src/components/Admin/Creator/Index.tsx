import React from 'react';
import { RouteProps, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import GuardedRoute from '../GuardedRoute';
import Creator from './Creator';
import Trip from './Trip';

class Index extends React.Component<RouteProps> {
    render() {
        return (
            <div>
                <Route exact path={this.props.match.path} component={Creator} />
                <GuardedRoute auth={this.props.userLogged} path={`${this.props.match.path}/trip/:id?`} component={Trip} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogged: state.auth.userLogged,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Index);
