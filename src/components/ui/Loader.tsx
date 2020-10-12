import React from 'react';

export default ({size, text}: {size?:string, text?:string}) => {
    return (
        <div className={`ui active centered inline loader text ${size}`}>{text}</div>
    );
};