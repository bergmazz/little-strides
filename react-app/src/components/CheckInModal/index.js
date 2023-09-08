import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import { fetchRoutines } from '../../store/routine';
import "./CheckInModal.css";

function CheckinFormModal ( { habits } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let habitz = habits
    const handleSubmit = async () => {
        habitz.map( ( habit ) => (
            dispatch( createCheckin( habit.id, habit.completed ) )
        ) )
        dispatch( fetchRoutines() );
        closeModal()
    };

    return (
        <div className="checkin-form-container">
            <h2>How did your routine go today? Did you do this one?</h2>

            <div className="habitsss">
                { habitz.map( ( habit ) => (
                    <div key={ habit.id } className="checkin-tile ">
                        <div className='desc'>
                        <p>{ habit.description }</p>
                    </div>
                    <div className="checkin-options">
                        <button onClick={ () => habit[ 'completed' ] = 1 }>Yes</button>
                        <button onClick={ () => habit[ 'completed' ] = 0 }>Not Today</button>
            </div>
                </div>
            ) ) }
            </div>
            <button onClick={ handleSubmit }>Submit</button>
        </div>

    );
}

export default CheckinFormModal;
