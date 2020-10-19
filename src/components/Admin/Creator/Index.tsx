import React from 'react';
import { connect } from 'react-redux';

import { User } from '../../../models/Auth.model';
import api from '../../../services/api';
import Loader from '../../ui/Loader';
import GoogleAuth from '../GoogleAuth';
import CountrySelector from './CountrySelector';
import TripsList from './TripsList';

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

class Creator extends React.Component<Props> {
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

    renderPlaceholder() {
        if (this.props.userLogged === null) {
            return (
                <div className="ui segment">
                    <Loader />
                </div>
            );
        };

        return (
            <div className="ui placeholder segment">
                <div className="ui icon header">
                    <i className="plane icon"></i>
                    Log in with Google and add your trips.
                </div>
                <GoogleAuth />
            </div>
        );
    }

    render() {
        return (
            <div className="ui container">
                <CountrySelector 
                    countryOptions={this.state.countryOptions}
                    selectedCountries={this.state.selectedCountries}
                    onSelectCountries={this.onSelectCountries}
                    onSaveCountries={this.onSaveCountries}
                    loading={this.state.loading}
                />

                {this.props.userLogged 
                    ? <TripsList trips={this.state.trips}/>
                    : this.renderPlaceholder()
                }
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