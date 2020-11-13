import React from 'react';

import { FileMetadata, GoogleDriveFile } from '../../../models/Trips.model';
import './FolderFiles.css';

export default ({files, onFileClick, tripFiles}: {files:GoogleDriveFile[], onFileClick, tripFiles:FileMetadata[]}) => {
    const loading = files.length === 0;

    const onFileClickHandle = fileId => {
        const checkbox: HTMLInputElement = document.getElementById(`fileSelect-${fileId}`) as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
        onFileClick(fileId, checkbox.checked);
    }

    const isChecked = fileId => {
        const trip = tripFiles.find(trip => trip.id === fileId);
        return trip ? true : false
    }

    const filesGrid = files.map(file => {
        return (
            <div key={file.id} className="four wide column image" onClick={() => onFileClickHandle(file.id)}>
                <div className="checkbox">
                    <input 
                        type="checkbox" 
                        id={`fileSelect-${file.id}`} 
                        checked={isChecked(file.id)} 
                        name="fileSelect" 
                        readOnly
                        onClick={e => e.preventDefault()}
                    />
                </div>
                <img alt="Google drive folder file" src={`https://drive.google.com/thumbnail?id=${file.id}`}/>

                { file.mimeType === 'video/mp4' ?  <div className="video-element"><i className="ui icon play" /></div> : null }
            </div>
        );
    });

    return (
        <div className={`files-container ui segment ${loading ? 'loading' : ''}`}>
            <h3>Select your trip files</h3>
            <div className="ui grid container">
                { filesGrid }
            </div>
        </div>
    );
};