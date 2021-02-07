import React, { useState } from 'react';

export const Message = ({type, title, message}: {type?:string, title:string, message:string}) => {
    const [ active, setActive ] = useState<boolean>(true);
    type = type ? type : 'info';

    setTimeout(() => {
        setActive(false);
    }, 4000);

    if (!active) return null;
    
    return (
        <div className={`ui negative ${type} message`}>
            <i className="close icon" onClick={() => setActive(false)}></i>
            <div className="header">
                {title}
            </div>
            <p>{message}</p>
        </div>
    );
}
