import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { RouteProps } from 'react-router-dom';

const countryOptions = [
    { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
];


class CreateMap extends React.Component<RouteProps> {
    state = {
        selectedCountries: []
    };

    componentDidMount() {
        const mapId = this.props.match.params.id;

        if (mapId) {
            console.log('should fetch countries');
        }
    }

    saveCountries = () => {
        console.log('...saving: ', this.state.selectedCountries);
    }

    render() {
        return (
            <div className="ui container">
                <Dropdown
                    clearable
                    fluid
                    multiple
                    search
                    selection
                    value={this.state.selectedCountries}
                    options={countryOptions}
                    placeholder='Select countries'
                    onChange={(event, {value}) => this.setState({selectedCountries:value})}
                />

                <button className="ui button" onClick={this.saveCountries}>Save map</button>
            </div>
        )
    }
}

export default CreateMap;