import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default ({countryOptions, selectedCountries, onSelectCountries, loading}) => {

    return (
        <div className="ui segment">
            <h2>Add countries to your map</h2>
            <Dropdown
                clearable
                fluid
                multiple
                search
                selection
                loading={countryOptions.length === 0 || loading}
                value={selectedCountries}
                options={countryOptions}
                placeholder='Select countries'
                onChange={(event, {value}) => onSelectCountries(value)}
            />
        </div>
    )
};