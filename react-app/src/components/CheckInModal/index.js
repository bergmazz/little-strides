import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import { fetchRoutines } from '../../store/routine';
import "./CheckInModal.css";

function CheckinFormModal ( { habits } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async () => {
        habits.map( ( habit ) => (
            dispatch( createCheckin( habit.id, habit.completed ) )
        ) )
        dispatch( fetchRoutines() );
        closeModal()
    };

    return (
        <div className="checkin-form-container">
            <h2>How did your routine go today? Did you do this one?</h2>
            { habits.map( ( habit ) => (
                <div key={ habit.id }>
                    <div className='bubble'>
                        <p>{ habit.description }</p>
                    </div>
                    <div className="checkin-options">
                        <button onClick={ () => habit[ 'completed' ] = 1 }>Yes</button>
                        <button onClick={ () => habit[ 'completed' ] = 0 }>Not Today</button>
            </div>
                </div>
            ) ) }

            <button onClick={ handleSubmit }>Submit</button>
        </div>
    );
}

export default CheckinFormModal;
