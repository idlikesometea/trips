import React from 'react';

export default ({files}) => {
    const loading = files.length === 0;

    const filesGrid = files.map(file => {
        return (
            <div key={file.id} className="four wide column">
                <img alt="Google drive folder file" src={`https://drive.google.com/thumbnail?id=${file.id}`}/>
            </div>
        );
    });

    return (
            <div className={`ui segment ${loading ? 'loading' : ''}`}>
                <div className="ui grid container">
                    { filesGrid }
                </div>
            </div>
    );
};