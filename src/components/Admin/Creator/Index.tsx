import React from 'react';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router-dom';

import { User } from '../../../models/Auth.model';
import Trip from '../../../models/Trips.model';
import api from '../../../services/api';
import CountrySelector from './CountrySelector';

interface Props {
    userLogged: boolean;
    user: User;
};

const initialState = {
    userHasMap: null,
    map: null,
    countryOptions: [],
    selectedCountries: [],
    userHasTrips: null,
    trips: [],
    loading: false
}

class Creator extends React.Component<RouteProps & Props> {
    state = {...initialState};

    async getUserData () {
        this.setState({userHasMap:false});
        console.log('::Creator:fetching > userData');
        await api.get(`trips/user/${this.props.user.id}`)
            .then(({data}) => {
                this.setState({
                    userHasMap: data.map || false,
                    map: data.map,
                    userHasTrips: (data.trips.length > 0) || false,
                    trips: data.trips
                });
                if (data.map) this.getSelectedCountries();
            })
            .catch(err => console.log(err));
    }

    async getCountryOptions () {
        const response = await api.get('trips/countries');
        console.log('::Creator:fetching > countryOptions');
        this.setState({countryOptions: response.data});
    }
    
    async getSelectedCountries () {
        const response = await api.get(`trips/map/${this.state.map}`);
        console.log('::Creator:fetching > selectedCountries');
        this.setState({selectedCountries: response.data});        
    }

    componentDidMount() {
        this.getCountryOptions();
        if (this.props.match.params.id) {
            this.setState({map: this.props.match.params.id});
            this.getSelectedCountries();
        }
    }

    componentDidUpdate() {
        if (this.props.userLogged && this.state.userHasMap === null) {
            this.getUserData();
        }

        if (this.props.userLogged === false && this.state.userHasMap !== null) {
            this.setState({
                userHasMap: null,
                userHasTrips: null,
                trips: []
            });
        }
    }

    onSelectCountries = selectedCountries => this.setState({selectedCountries: selectedCountries});
    
    onSaveCountries = () => {
        console.log('::Creator:saving > countries')
        this.setState({loading: true});
        api.post('trips/map', {countries: this.state.selectedCountries})
            .then(({data}) => {
                this.setState({map: data.id});
            })
            .catch(err => console.log(err))
            .finally(() => this.setState({loading: false}));
    }

    renderTripsList() {
        const tripsList = this.state.trips.map((trip:Trip) => {
            return (
                <div key={trip.id}>
                    {trip.name}
                </div>
            );
        })
        return tripsList;
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui segment">
                    <CountrySelector 
                        countryOptions={this.state.countryOptions}
                        selectedCountries={this.state.selectedCountries}
                        onSelectCountries={this.onSelectCountries}
                        onSaveCountries={this.onSaveCountries}
                        loading={this.state.loading}
                    />
                </div>

                <div className="ui segment">
                    <h2>Your trips</h2>
                    {this.renderTripsList()}
                </div>
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

export default connect(mapStateToProps)(Creator);