import React from 'react';

import Loader from '../../ui/Loader';
import { StatsProps } from '../../../models/Dashboard.model';
import { Button } from 'semantic-ui-react';

export default ({props, onRetry}: {props:StatsProps, onRetry}) => {

    const renderError = () => {
        return (
            <div className="ui segment">
                <h1>Your Stats</h1>
                <div className="ui error message">
                    <div className="header">
                        { props.errorMsg }
                    </div>
                </div>
                <Button onClick={() => onRetry() }>Try again</Button>
            </div>
        )
    }

    const renderStats = () => {
        return (
            <div>
                <p>Maps: { props.stats.maps }</p>
                <p>Countries: { props.stats.countries }</p>
                <p>Photos: { props.stats.photos }</p>
                <p>Videos: { props.stats.videos }</p>
            </div>
        )
    }

    if (props.errorMsg !== '') {
        return renderError();
    }

    return (
        <div className="ui segment">
            <h1>Your Stats</h1>
            {
                props.loading
                ? <Loader size="medium" text="Loading your stats"/>
                : renderStats()
            }
        </div>
    );
};