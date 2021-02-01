import React from 'react';

import { GoogleDriveFile } from '../../../models/Trips.model';

interface componentInterface{
    onFetchFolders;
    folders: GoogleDriveFile[],
    onFolderClick;
    activeFolder: any;
}

export default ({folders, onFolderClick, activeFolder, onFetchFolders}: componentInterface) => {

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
            <div className="ui grid container" style={{padding:'2em 0'}}>
                { foldersList.length ? 
                    foldersList 
                    : <button className="ui blue button" onClick={() => onFetchFolders()}>Fetch your folders from Google Drive</button>
                }
            </div>

        </div>
    );
};