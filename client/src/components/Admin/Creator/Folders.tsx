import React from 'react';

import { GoogleDriveFile } from '../../../models/Trips.model';

export default ({folders, onFolderClick, activeFolder}: {folders:GoogleDriveFile[], onFolderClick, activeFolder:any}) => {

    const foldersList = folders.map(folder => {
        const className = `ui medium button ${folder.id === activeFolder ? 'green' : ''}`;
        return (
            <div key={folder.id} className="four wide column">
                <button 
                    className={className}
                    style={{width:'100%',height:'100%'}} 
                    onClick={() => onFolderClick(folder.id)}
                >
                    {folder.name}
                </button>
            </div>
        );
    });

    return (
        <div className="ui segment">
            <h3>Your folders</h3>
            <div className="ui grid container">
                { foldersList }
            </div>
        </div>
    );
};