import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default ({countryOptions, selectedCountries, onSelectCountries, onSaveCountries, loading}) => {
    return (
        <div className="ui segment">
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
            <br />
            <button 
                className={`ui primary button ${loading ? 'loading' : ''}`} 
                disabled={selectedCountries.length === 0} 
                onClick={onSaveCountries}
            >
                Save map
            </button>
        </div>
    )
};