import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import { fetchRoutines } from '../../store/routine';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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

    useEffect( () => {
        spinCarousel();
    }, [ currentCardIndex ] );

    useEffect( () => {
        dispatch( fetchRoutines() );
    }, [ submitted ] )

    const handleAnswerClick = ( index, completed ) => {
        // console.log( "answerclick currcardindex", currentCardIndex )
        const updatedAnswers = [ ...selectedAnswers ];
        updatedAnswers[ index ].completed = completed;
        setSelectedAnswers( updatedAnswers );
        // Rotate to the next card
        if ( index === habits.length - 1 ) {
            // ( changing current card calls spinCarousel in useEffect)
            setCurrentCardIndex( 0 )
        } else {
            setCurrentCardIndex( index + 1 );
        }
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

    const spinCarousel = () => {
        const numberOfCards = habits.length;
        const cardWidth = 150;
        const angle = 360 / numberOfCards;
        const translateZ = Math.round(
            ( cardWidth / 2 ) / ( Math.tan( Math.PI / numberOfCards ) )
        );
        const carousel = document.querySelector( ".carousel" );
        if ( carousel ) {
            const cards = carousel.getElementsByClassName( "checkin-step" );
            for ( let i = 0; i < numberOfCards; i++ ) {
                let currangle = ( i - currentCardIndex ) * angle;

                const transformValue = `rotateY(${ currangle }deg) translateZ(${ translateZ }px)`;
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

                    <button onClick={ closeModal }>No thanks</button>
                </div>
            ) : (
                    <div className="checkin-form-container">
                        <h2>How did your routine go today? </h2>
                        <div className="checkin-steps-container">
                            <div className="carousel">
                { habits.map( ( habit, index ) => (
                    <div key={ habit.id } className="checkin-step">
                        <div className="desc">
                            <p>{ habit.description }</p>
                        </div>
                        <div className="checkin-options">
                            <button
                                onClick={ () => handleAnswerClick( index, 1 ) }
                                className={ selectedAnswers[ index ].completed === 1 ? "selected next-button" : "next-button" }
                                disabled={ index !== currentCardIndex }
                            >
                                Yes
                            </button>
                            <button
                                onClick={ () => handleAnswerClick( index, 0 ) }
                                className={ selectedAnswers[ index ].completed === 0 ? "selected next-button" : "next-button" }
                                disabled={ index !== currentCardIndex }
                            >
                                Not Today
                            </button>
            </div>
                    </div>
                ) ) }
                        </div>
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
