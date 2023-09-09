import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import { fetchRoutines } from '../../store/routine';
import "./CheckInModal.css";

function CheckinFormModal ( { habits } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [ selectedAnswers, setSelectedAnswers ] = useState(
        habits.map( () => ( { completed: null } ) )
    );

    const handleAnswerClick = ( index, completed ) => {
        const updatedAnswers = [ ...selectedAnswers ];
        updatedAnswers[ index ].completed = completed;
        setSelectedAnswers( updatedAnswers );
    };

    const handleSubmit = async () => {
        const hasNullAnswers = selectedAnswers.some( ( answer ) => answer.completed === null );

        if ( hasNullAnswers ) {
            // Display an error message or take any other action
            alert( "Please answer all questions before submitting." );
        } else {
            habits.forEach( ( habit, index ) => {
                const completed = selectedAnswers[ index ].completed;
                dispatch( createCheckin( habit.id, completed ) );
            } );
            dispatch( fetchRoutines() );
            closeModal()
        }
    };

    return (
        <div className="checkin-form-container">
            <h2>How did your routine go today? </h2>
            <div className="habit-steps-container">
                { habits.map( ( habit, index ) => (
                    <div key={ habit.id } className="checkin-step">
                        <div className="desc">
                            <p>{ habit.description }</p>
                        </div>
                        <div className="checkin-options">
                            <button
                                onClick={ () => handleAnswerClick( index, 1 ) }
                                className={ selectedAnswers[ index ].completed === 1 ? "selected" : "" }
                            >
                                Yes
                            </button>
                            <button
                                onClick={ () => handleAnswerClick( index, 0 ) }
                                className={ selectedAnswers[ index ].completed === 0 ? "selected" : "" }
                            >
                                Not Today
                            </button>
            </div>
                    </div>
                ) ) }
            </div>
            <div className="sub">
                <button onClick={ handleSubmit }>Submit</button>
            </div>
        </div>

    );
}

export default CheckinFormModal;
