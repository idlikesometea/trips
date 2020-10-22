import React, { useEffect, useState } from 'react';
import { Trip } from '../../../models/Trips.model';

interface TripInformationProps {
    tripInfo: Trip, 
    onSaveClick, 
    onChangeHandle, 
    loading: boolean
};

export default ({tripInfo, onSaveClick, onChangeHandle, loading}: TripInformationProps ) => {
    const [trip, setTrip] = useState<Trip>(tripInfo);

    useEffect(() => {  
        setTrip(tripInfo);
    }, [tripInfo]);

    const onInputChange = ({target}) => {
        setTrip({...trip, [target.name]: target.value});
        onChangeHandle(target);
    };

    return (
        <div className={`ui segment ${loading ? 'loading' : ''}`}>
            <form className="ui form">
                <div className="field">
                    <label>Trip name</label>
                    <input name="name" type="text" autoComplete="off" value={trip.name} onChange={onInputChange} />
                </div>

                <div className="fields">
                    <div className="field">
                        <label>Start date</label>
                        <input name="startDate" type="date" value={trip.startDate} onChange={onInputChange}  />
                    </div>
                    <div className="field">
                        <label>End date</label>
                        <input name="endDate" type="date" value={trip.endDate} onChange={onInputChange}  />
                    </div>
                </div>

                <button className="ui button primary" onClick={onSaveClick}>Save trip information</button>
            </form>
        </div>
    );
};