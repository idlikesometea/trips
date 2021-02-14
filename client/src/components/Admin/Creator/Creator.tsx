import React from 'react';
import { connect } from 'react-redux';

import { api, authedApi } from '../../../services/api';
import Loader from '../../ui/Loader';
import GoogleAuth from '../GoogleAuth';
import CountrySelector from './CountrySelector';
import TripsList from './TripsList';

import { creatorState, Props, Map } from '../../../models/Creator.model';
import { Trip } from '../../../models/Trips.model';
import { Button } from 'semantic-ui-react';

import './Creator.css';

class Creator extends React.Component<Props> {
    state = {...creatorState};

    componentDidMount() {
        this.getCountryOptions();
        const mapId = this.props.match.params.mapId;
        if (mapId) {
            this.fetchMap(mapId);
            this.fetchTrips(mapId);
        }
    }

    handleError(error) {
        if (error.status === 403) {
            this.props.history.push('/creator');
        }
    }

    async fetchMap (mapId) {
        this.setState({loadingMap: true});
        await authedApi.get(`creator/map/${mapId}`)
            .then(({data}: {data:Map}) => this.setState({map: data, selectedCountries: data.countries}))
            .catch(({response}) => this.handleError(response))
            .finally(() => this.setState({loadingMap: false}));
    }

    async fetchTrips (mapId) {
        this.setState({loadingTrips: true});
        await authedApi.get(`creator/trips/${mapId}`)
            .then(({data}: {data:Trip[]}) => this.setState({trips: data}))
            .catch(({response}) => this.handleError(response))
            .finally(() => this.setState({loadingMap: false}));
    }

    async getCountryOptions () {
        const { data } = await api.get('countries');
        this.setState({countryOptions: data});
    }

    onSelectCountries = selectedCountries => this.setState({selectedCountries});
    
    onSaveMap = () => {
        if (this.props.userLogged) {
            this.saveMap();
        } else {
            this.savePublicMap();
        }
    }

    saveMap = () => {

    }

    savePublicMap = () => {
        this.setState({loadingMap: true});
        const countries =this.state.selectedCountries;
        api.post('map', { countries })
            .then(({data}) => this.props.history.push(`m/${data}`))
            .catch(({response}) => this.handleError(response))
            .finally(() => this.setState({loadingMap: false}));
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
            <div className="ui container creator">
                {/* <div className="field">
                    <input 
                        type="text" 
                        autoComplete="off" 
                        value={this.state.map.name} 
                        onChange={({target}) => 
                        this.setState({map: {name:target.value}})} 
                    />
                </div> */}

                <div className="ui justified header">
                    <h1>Title</h1>
                    <Button
                        disabled={!this.state.selectedCountries.length} 
                        onClick={() => this.onSaveMap()}
                    >
                        Save map
                    </Button>
                </div>

                <CountrySelector 
                    countryOptions={this.state.countryOptions}
                    selectedCountries={this.state.selectedCountries}
                    onSelectCountries={this.onSelectCountries}
                    loading={this.state.loadingMap}
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