import React from 'react';

import { RouteProps } from 'react-router-dom';
import api from '../../services/api';
import CountrySelector from './CountrySelector';

class CreateMap extends React.Component<RouteProps> {
    state = {
        mapId: this.props.match.params.id,
        countryOptions: [],
        selectedCountries: []
    };

    async getCountryOptions () {
        const response = await api.get('trips/countries');
        this.setState({countryOptions: response.data});
    }

    async getSelectedCountries () {
        const response = await api.get(`trips/map/${this.state.mapId}`);
        const selectedOptions = response.data;
        this.setState({selectedCountries: selectedOptions});        
    }

    componentDidMount() {
        this.getCountryOptions();

        if (this.state.mapId) {
            this.getSelectedCountries();
        }
    }

    onSelectCountries = selectedCountries => this.setState({selectedCountries: selectedCountries});
    
    onSaveCountries = () => {
        api.post('trips/map', {countries: this.state.selectedCountries})
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log('error');
            });
    }

    render() {
        return (
            <div className="ui container">
                <CountrySelector 
                    countryOptions={this.state.countryOptions}
                    selectedCountries={this.state.selectedCountries}
                    onSelectCountries={this.onSelectCountries}
                    onSaveCountries={this.onSaveCountries}
                />
            </div>
        )
    }
}

export default CreateMap;