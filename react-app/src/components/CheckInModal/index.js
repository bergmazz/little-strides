import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import { fetchRoutines } from '../../store/routine';
import "./CheckInModal.css";

function CheckinFormModal ( { habits } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ submitted, setSubmitted ] = useState( false )
    const [ yesPercentage, setYesPercentage ] = useState( 0 );
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
            alert( "Please answer all questions before submitting." );
        } else {
            habits.forEach( ( habit, index ) => {
                const completed = selectedAnswers[ index ].completed;
                dispatch( createCheckin( habit.id, completed ) );
            } );

            const totalResponses = selectedAnswers.length;
            const yesResponses = selectedAnswers.filter( ( answer ) => answer.completed === 1 ).length;
            const percentage = ( yesResponses / totalResponses ) * 100;
            setYesPercentage( percentage );

            dispatch( fetchRoutines() );
            setSubmitted( true )
            // closeModal()
        }
    };

    return (
        <div className="checkin-form-container">
            { submitted ? (
                <div>
                    <h1>You're making strides!</h1>
                    <h4>"Yes" Responses Today:</h4>
                    <h1>{ yesPercentage.toFixed( 2 ) }%</h1>
                    {/* <h4>"Yes" Responses Last Week:</h4> */ }
                    {/* <h1>{ habits.averagePastWeek }</h1> */ }
                    {/* <button onClick={ closeModal }>exit</button> */ }
                </div>
            ) : (
                <div>
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
            )
            }
        </div>

    );
}

export default CheckinFormModal;
