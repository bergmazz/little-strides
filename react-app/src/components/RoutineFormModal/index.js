import React, { useState, useEffect } from "react";
// import { a, b, c, d, e, f, g, h } from "./Steps"
import { createRoutine } from "../../store/routine";
import { suggestedHabits } from "../../store/habit";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutineFormModal.css";

function RoutineFormModal ( { routines } ) {
    const hasReachedLimit = routines && routines.length >= 3;
    const dispatch = useDispatch();
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ routineName, setRoutineName ] = useState( "" );
    const [ coverImage, setCoverImage ] = useState( "" );
    const [ selectedTopics, setSelectedTopics ] = useState( [] );
    const [ topTopic, setTopTopic ] = useState( "" );
    const [ habits, setHabits ] = useState( [ "" ] );
    const [ habitDetail, setHabitDetail ] = useState( [ "" ] );
    const [ error, setError ] = useState( [] );
    const { closeModal } = useModal();

    const suggested = useSelector( ( state ) => state.habit.suggested );

    const availableTopics = [
        'Anxiety',
        'Relationships',
        'Exercise',
        'Stress',
        'Wellness',
        'Sleep',
        'Depression',
        'Productivity',
    ];

    const totalSteps = 7;

    useEffect( () => {
        if ( currentStep === 3 && suggested ) {
            dispatch( suggestedHabits( selectedTopics ) )
        }
    }, [ currentStep, suggested ] );


    const handleNextStep = () => {
        if ( currentStep < totalSteps ) {
            setCurrentStep( ( prevStep ) => prevStep + 1 );
        }
        // if ( currentStep === 3 ) {
        //     dispatch( suggestedHabits( selectedTopics ) );
        // }
        if ( currentStep === 5 ) {
            setCurrentStep( totalSteps );
        }
    };

    const handlePrevStep = () => {
        if ( currentStep > 1 ) {
            setCurrentStep( ( prevStep ) => prevStep - 1 );
        }
        if ( currentStep === totalSteps ) {
            setCurrentStep( 5 );
        }
    };

//TODO add warning when you click on modal background, this only works when refreshing the page
    useEffect( () => {
        const handleBeforeUnload = ( event ) => {
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener( "beforeunload", handleBeforeUnload );
        return () => {
            window.removeEventListener( "beforeunload", handleBeforeUnload );
        };
    }, [] );

    const handleSelectTopics = ( selectedTopic ) => {
        if ( selectedTopics.includes( selectedTopic ) ) {
            setSelectedTopics( selectedTopics.filter( ( topic ) => topic !== selectedTopic ) )
        } else {
            if ( selectedTopics.length < 3 ) {
                setSelectedTopics( [
                    ...selectedTopics,
                    selectedTopic,
                ] );
            }
        }
    };


    const handleSubmit = async ( e ) => {
        e.stopPropagation();
        e.preventDefault();
        if ( currentStep === totalSteps ) {
            const data = await dispatch(
                createRoutine( {
                    rname: routineName,
                    cover_image: coverImage,
                    topic: topTopic,
                } )
            );
            if ( Array.isArray( data ) ) {
                setError( data[ 0 ] );
            } else {
                closeModal();
            }

        }
    };

    const stepContent = () => {
        switch ( currentStep ) {
            case 1:
                return (
                    <div>
                        {/* <Step1
                            routineName={ routineName }
                            setRoutineName={ setRoutineName }
                            setCurrentStep={ setCurrentStep }
                        /> */}
                        <p>Set a name for the routine</p>
                        <input
                            type="text"
                            value={ routineName }
                            onChange={ ( e ) => setRoutineName( e.target.value ) }
                        />
                        <button type="button">
                            help me build a routine
                        </button>
                        <button type="button" onClick={ () => { setCurrentStep( 5 ) } }>
                            start from scratch
                        </button>
                    </div>
                ); case 2:
                return (
                    <div>
                        <p>Choose up to three topics:</p>
                        <div className="topics-container">
                            { availableTopics.map( ( topic ) => (
                                <label key={ topic } className="topic-tile">
                                    <input
                                        type="checkbox"
                                        value={ topic }
                                        checked={ selectedTopics.includes( topic ) }
                                        onChange={ () => handleSelectTopics( topic ) }
                                    />
                                    { topic }
                                </label>
                            ) ) }
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p>Choose Your Focus</p>
                        { selectedTopics.map( ( topic ) => (
                            <label key={ topic } className="big-topic-tile">
                                <input
                                    type="radio"
                                    value={ topic }
                                    checked={ topTopic == topic }
                                    onChange={ () => setTopTopic( topic ) }
                                />
                                { topic }
                            </label>
                        ) ) }
                    </div>
                );
            case 4:
                return (
                    <div>
                        <p>suggested habits</p>
                        { suggested.map( ( habit ) => (
                            <button type="button" onClick={ ( e ) => { setHabit( [ ...habits, e.target.value.desc, e.target.value.cat ] ) } }>
                                { habit }
                            </button>
                        ) ) }
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p>edit/create habits</p>
                        <p>{ habits }</p>
                        <button type="button" onClick={ ( e ) => {
                            setHabitDetail( [ e.target.value ] )
                            setCurrentStep( 6 )
                        } }>
                            edit this one
                        </button>

                    </div>

                );
            case 6:
                return (
                    <div>
                        <p>your habit</p>

                    </div>
                );
            case 7:
                return (
                    <div>
                        <p>choose cover image</p>
                        <input
                            type="text"
                            value={ coverImage }
                            onChange={ ( e ) => setCoverImage( e.target.value ) }
                        />
                    </div>
                );
            default:
                return ( <p>oops</p> );
        }
    };

    return (
        <>
            { hasReachedLimit ? (
                <div className="error-popup">
                    <p>You already have 3 routines. Please delete one to create another.</p>
                </div>
            ) : (
                <div>
                <h1>Create New Routine - Step { currentStep }</h1>
                <form onSubmit={ handleSubmit }>
                { stepContent( currentStep ) }
                <div>
                    { currentStep !== 1 && (
                        <button type="button" onClick={ handlePrevStep }>
                            &lt; Backward
                        </button>
                    ) }
                    { currentStep !== totalSteps && currentStep !== 6 && (
                        <button type="button" onClick={ handleNextStep }>
                            Forward &gt;
                        </button>
                    ) }
                    { currentStep === totalSteps && <button type="submit">Submit</button> }
                </div>
                        </form>
                </div>
            )
            }
            </>
    );
}


export default RoutineFormModal;
