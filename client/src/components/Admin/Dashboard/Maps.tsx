import React from 'react';
import { Link } from 'react-router-dom'
import { Loader } from 'semantic-ui-react';

import { MapsProps} from '../../../models/Dashboard.model';
import Placeholder from './Placeholder';

export default ({props}: {props:MapsProps}) => {

    const renderMaps = () => {
        if (!props.maps.length) {
            return <Placeholder />
        }

        return props.maps.map(map => {
            return (
                <div>
                    <p>{map.name}</p>
                    <Link className="ui button primary" to="creator">Update your map</Link>
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
                ?   <Loader />
                :   renderMaps()
            }
        </div>
    );
};