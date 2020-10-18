import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default ({countryOptions, selectedCountries, onSelectCountries, onSaveCountries}) => {
    return (
        <div>
            <Dropdown
                clearable
                fluid
                multiple
                search
                selection
                loading={countryOptions.length === 0}
                value={selectedCountries}
                options={countryOptions}
                placeholder='Select countries'
                onChange={(event, {value}) => onSelectCountries(value)}
            />
            <button className="ui primary button" onClick={onSaveCountries}>Save map</button>
        </div>
    )
};