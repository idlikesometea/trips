import React from 'react';
import { Dropdown } from 'semantic-ui-react';

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

class CreateMap extends React.Component {
    state = {
        selectedCountries: []
    };

    renderCountriesList() {
        const countriesList = this.state.selectedCountries.map(country => {
            return <div key={country}> {country} </div>;
        });

        return <div className="ui relaxed list divided"> {countriesList} </div>
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

                {this.renderCountriesList()}
            </div>
        )
    }
}

export default CreateMap;