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
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );

    const handleAnswerClick = ( index, completed ) => {
        const updatedAnswers = [ ...selectedAnswers ];
        updatedAnswers[ index ].completed = completed;
        setSelectedAnswers( updatedAnswers );
        // Rotate to the next card
        setCurrentCardIndex( ( prevIndex ) => ( prevIndex + 1 ) % habits.length );
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

    useEffect( () => {
        makeMyCarousel();
    }, [ currentCardIndex ] );

    useEffect( () => {
        dispatch( fetchRoutines() );
    }, [ submitted ] )
    // carousel tutorial:
    // https://github.khronos.org/siggraph2012course/CanvasCSSAndWebGL/demos/3dtransforms/docs/carousel.html
    const makeMyCarousel = () => {
        const numberOfCards = habits.length;
        const containerWidth = document.querySelector( ".habit-steps-container" ).offsetWidth;

        let cardSize = Math.min( containerWidth / numberOfCards, containerWidth * 0.8 ) * 1.4;
        if ( numberOfCards > 10 ) {
            cardSize = Math.min( containerWidth / ( numberOfCards ), containerWidth * 0.8 );
        }
        if ( numberOfCards > 20 ) {
            cardSize = containerWidth * 0.1;
        }
        const tz = Math.round(
            ( cardSize / 2 ) / Math.tan( ( Math.PI / numberOfCards ) / 2 )
        );

        const carousel = document.querySelector( ".habit-steps-container" );

        if ( carousel ) {
            const cards = carousel.getElementsByClassName( "checkin-step" );

            for ( let i = 0; i < numberOfCards; i++ ) {
                console.log( "currentcardindex---------", currentCardIndex )
                console.log( "i value in loop---------", i )
                console.log( "cards[i]---------", cards[ i ] )
                const rotation = ( 360 / numberOfCards ) * ( i - currentCardIndex );
                //Makes da circle
                const transformValue = `rotateY(${ rotation }deg) translateZ(${ tz }px)`;
                cards[ i ].style.transform = transformValue;

                if ( i === currentCardIndex ) {
                    cards[ i ].classList.add( "current" );
                } else {
                    cards[ i ].classList.remove( "current" );
                }

            }
        }
    };

    return (
        <div className="pointlesscompilingthing">
            { submitted ? (
                <div className="checkin-confirmation">
                    <h1>You're making strides!</h1>
                    <h4>"Yes" Responses Today:</h4>
                    <h1>{ yesPercentage.toFixed( 2 ) }%</h1>
                    {/* <h4>"Yes" Responses Last Week:</h4> */ }
                    {/* <h1>{ habits.averagePastWeek }</h1> */ }
                    {/* <button onClick={ closeModal }>exit</button> */ }
                </div>
            ) : (
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
                                disabled={ index !== currentCardIndex }
                            >
                                Yes
                            </button>
                            <button
                                onClick={ () => handleAnswerClick( index, 0 ) }
                                className={ selectedAnswers[ index ].completed === 0 ? "selected" : "" }
                                disabled={ index !== currentCardIndex }
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
