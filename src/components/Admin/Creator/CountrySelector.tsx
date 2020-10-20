import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default ({countryOptions, selectedCountries, onSelectCountries, onSaveCountries, map, loading}) => {
    return (
        <div className="ui segment">
            <h2>Add countries to your map</h2>
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

            { map
                ? <Link to={`/m/${map}`} basename="/" className="ui button green" style={{float:'right'}}>See map</Link>
                : null
            }
        </div>
    )
};