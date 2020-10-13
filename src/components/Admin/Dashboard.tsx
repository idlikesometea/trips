import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="ui placeholder segment">
                <div className="ui two column stackable center aligned grid">
                    <div className="ui vertical divider">Or</div>
                    <div className="middle aligned row">
                        <div className="column">
                            <div className="ui icon header">
                                <i className="search icon"></i>
                                Find Country
                            </div>
                            <div className="field">
                                <div className="ui search">
                                    <div className="ui icon input">
                                        <input className="prompt" type="text" placeholder="Search countries..." />
                                        <i className="search icon"></i>
                                    </div>
                                    <div className="results"></div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui icon header">
                                <i className="world icon"></i>
                                Add New Country
                            </div>
                            <div className="ui primary button">
                                Create
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;