import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import "./CheckinFormModal.css";

function CheckinFormModal ( { habits } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ completed, setCompleted ] = useState( false ); // Initialize completed state as needed.

    const handleSubmit = async () => {
        // for habit in habits
        await dispatch( addCheckin( habit.id, completed ) );
        closeModal();
    };

    return (
        <div className="checkin-form-container">
            <h2>How did your routine go today? Did you do this one?</h2>
            habits
            <h3> { habit.description } </h3>

            <div className="checkin-options">
                <button onClick={ () => habit[ 'completed' ] = true }>Yes</button>
                <button onClick={ () => setCompleted( false ) }>Not Today</button>
            </div>

            <button onClick={ handleSubmit }>Submit</button>
        </div>
    );
}

export default CheckinFormModal;
