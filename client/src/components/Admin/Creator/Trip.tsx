import React from 'react';
import { RouteProps } from 'react-router-dom';

import api from '../../../services/api';
import { Trip as ITrip, TripMock } from '../../../models/Trips.model';

const initialState:{id:any, trip:ITrip} = {
    id: null,
    trip: TripMock
};

class Trip extends React.Component<RouteProps> {
    state = {...initialState, id: this.props.match.params.id || null};

    async fetchTrip() {
        const response = await api.get(`trips/list/${this.state.id}`);

        this.setState({trip: response.data});
    }

    onChangeHandle = ({target}) => this.setState({trip: {[target.name]: target.value}});

    componentDidMount() {
        if (this.state.id) {
            this.fetchTrip();
        }
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui header">
                    <h2>{ this.state.id ? this.state.trip.name : 'Create a new trip'}</h2>
                </div>
                <form className="ui form">
                    <div className="field">
                        <label>Trip name</label>
                        <input name="name" type="text" autoComplete="off" value={this.state.trip.name} onChange={this.onChangeHandle} />
                    </div>

                    <div className="fields">
                        <div className="field">
                            <label>Start date</label>
                            <input name="startDate" type="date" value={this.state.trip.startDate} onChange={this.onChangeHandle}  />
                        </div>
                        <div className="field">
                            <label>End date</label>
                            <input name="endDate" type="date" value={this.state.trip.endDate} onChange={this.onChangeHandle}  />
                        </div>
                    </div>

                    <div className="ui segment">
                        <h3>Your files</h3>
                        <div className="ui grid container">
                            <div className="four wide column">File</div>
                            <div className="four wide column">File</div>
                            <div className="four wide column">File</div>
                            <div className="four wide column">File</div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

export default Trip;