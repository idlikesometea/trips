import React from 'react';

export const Message = ({type, title, message}: {type?:string, title:string, message:string}) => {
    type = type ? type : 'info';

    return (
        <div className={`ui negative ${type} message`}>
            <i className="close icon"></i>
            <div className="header">
                {title}
            </div>
            <p>{message}</p>
        </div>
    );
}
