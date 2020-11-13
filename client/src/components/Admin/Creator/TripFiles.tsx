import React from 'react';

import { FileMetadata } from '../../../models/Trips.model';
import './TripFiles.css';

export default ({files}:{files:FileMetadata[]}) => {
    const filesList = files.map(file => {
        return (
            <div className="file" key={file.id}>
                <img alt={file.time} src={`https://drive.google.com/thumbnail?id=${file.id}`}/>
            </div>
        );
    })
    
    return (
        <div className="ui segment">
            <h3>Your trip files</h3>
            <div className="trip-files">
                {files.length ? 
                    filesList
                    : `Add some files to your trip`
                }
            </div>
        </div>
    );
};