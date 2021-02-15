import React from 'react';
import { Link } from 'react-router-dom'

import { MapsProps } from '../../../models/Dashboard.model';
import Placeholder from './Placeholder';
import Loader from './../../ui/Loader';
import { Button } from 'semantic-ui-react';

export default ({props, onRetry}: {props:MapsProps, onRetry}) => {

    const renderError = () => {
        return (
            <div className="ui segment">
                <h1>Your Maps</h1>
                <div className="ui error message">
                    <div className="header">
                        { props.errorMsg }
                    </div>
                </div>
                <Button onClick={() => onRetry() }>Try again</Button>
            </div>
        )
    }

    if (props.errorMsg !== '') {
        return renderError();
    }

    const renderMapsList = () => {
        if (!props.maps.length) {
            return <Placeholder />
        }

        return props.maps.map(map => {
            return (
                <div key={map.id}>
                    <p>{map.name}</p>
                    <Link className="ui button primary" to={`creator/${map.id}`}>Update your map</Link>
                    <Link className="ui button green" style={{float:'right'}} to={`m/${map.id}`}>See your map</Link>
                </div>
            )
        });
    }

    return (
        <div className="ui segment">
            <h1>Your Maps</h1>
            {
                props.loading
                ?   <Loader size="medium" text="Loading your maps" />
                :   renderMapsList()
            }
        </div>
    );
};