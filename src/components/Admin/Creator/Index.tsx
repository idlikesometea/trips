import React from 'react';
import { RouteProps, Route } from 'react-router-dom'

import Creator from './Creator';
import Trip from './Trip';

class Index extends React.Component<RouteProps> {
    render() {
        return (
            <div>
                <Route exact path={this.props.match.path} component={Creator} />
                <Route path={`${this.props.match.path}/trip/:id?`} component={Trip} />
            </div>
        );
    }
}

export default Index;