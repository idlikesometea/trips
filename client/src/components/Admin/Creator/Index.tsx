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
                <GuardedRoute 
                    exact
                    path={`${this.props.match.path}/trip/:id?`} 
                    auth={this.props.userLogged}
                    component={Trip} />

                <Route 
                    exact 
                    path={`${this.props.match.path}/:mapId?`} 
                    component={Creator} />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogged: state.auth.userLogged
    };
};

export default connect(mapStateToProps)(Index);
