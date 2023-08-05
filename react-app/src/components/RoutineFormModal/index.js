import React, { useState, useEffect } from "react";
// import { a, b, c, d, e, f, g, h } from "./Steps"
import { createRoutine, updateRoutine, deleteRoutinebyId } from "../../store/routine";
import { suggestedHabits, createHabit } from "../../store/habit";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutineFormModal.css";

function RoutineFormModal ( { routines } ) {
    const hasReachedLimit = routines && routines.length >= 3;
    const dispatch = useDispatch();
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ routineName, setRoutineName ] = useState( "" );
    const [ routineId, setRoutineId ] = useState( 0 );
    const [ coverImage, setCoverImage ] = useState( "" );
    const [ selectedTopics, setSelectedTopics ] = useState( [] );
    const [ topTopic, setTopTopic ] = useState( "" );
    const [ habits, setHabits ] = useState( [] );
    const [ habitDetail, setHabitDetail ] = useState( [ "" ] );
    const [ error, setError ] = useState( [] );
    const { closeModal } = useModal();
    const [ suggestedFetched, setSuggestedFetched ] = useState( false );

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

    const totalSteps = 8;

    useEffect( () => {
        if ( currentStep === 3 && !suggestedFetched ) {
            dispatch( suggestedHabits( selectedTopics ) );
            setSuggestedFetched( true );
        }
        if ( currentStep !== 3 ) {
            setSuggestedFetched( false );
        }
    }, [ dispatch, currentStep, suggestedFetched, selectedTopics ] );


    const handleNextStep = () => {
        if ( currentStep < totalSteps ) {
            setCurrentStep( ( prevStep ) => prevStep + 1 );
        }
        if ( currentStep === 5 ) {
            setCurrentStep( totalSteps );
        }
    };

    const handlePrevStep = () => {
        if ( currentStep > 1 ) {
            setCurrentStep( ( prevStep ) => prevStep - 1 );
        }
        if ( currentStep === 4 ) {
            setCurrentStep( 2 );
        }
        if ( currentStep === 7 ) {
            setCurrentStep( 5 );
        }
        if ( currentStep === totalSteps ) {
            setCurrentStep( 5 );
        }
    };

// this only works when refreshing the page - see showWarning in Modal.js for exit moda warning
    useEffect( () => {
        // if ( habits.length < 3 ) {
        //     deleteRoutinebyId(routineId)
        // }
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

    // const makeRoutineId = async () => {
    //     if ( routineId === 0 ) {
    //         const data = await dispatch(
    //             createRoutine( {
    //                 rname: routineName,
    //                 cover_image: "https://images.pexels.com/photos/8443211/pexels-photo-8443211.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //                 topic: "wellness",
    //             } )
    //         );
    //         if ( Array.isArray( data ) ) {
    //             setError( data[ 0 ] );
    //         }
    //         if ( data.id ) {
    //             setRoutineId( data.id )
    //         }
    //     }

    // }


    const handleSubmit = async ( e ) => {
        e.stopPropagation();
        e.preventDefault();
        console.log( habits )
        if ( habits.length >= 3 && currentStep === totalSteps ) {
            const routine = await dispatch(
                createRoutine( {
                    rname: routineName,
                    cover_image: coverImage,
                    topic: topTopic
                } )
            );
            if ( Array.isArray( routine ) ) {
                setError( routine[ 0 ] );
            } else {
                for ( let habit of habits ) {
                    createHabit( {
                        routineId: routine.id,
                        description: habit.description,
                        category: habit.category
                    } )
                }
                closeModal();
            }
        } else {
            setError( "please write a minimum of 3 habits" )
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
                        <button type="button" disabled={ !routineName } onClick={ () => {
                            // makeRoutineId()
                            setCurrentStep( 2 )
                        } }>
                            help me build a routine

                        </button>
                        <button type="button" disabled={ !routineName } onClick={ () => {
                            // makeRoutineId()
                            setCurrentStep( 5 )
                        } }>
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
                                    value={ topic.toLowerCase() }
                                    checked={ topTopic === topic.toLowerCase() }
                                    onChange={ () => setTopTopic( topic.toLowerCase() ) }
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
                        { suggested.map( ( habit, index ) => {
                            const [ habitText, habitTopic ] = habit.split( " !#*SPLIT " );
                            return (
                                <div>
                                    <button
                                        key={ index }
                                        onClick={ () => {
                                            //not gunna work champ
                                            setHabits( [ ...habits, { "category": habitTopic, "description": habitText } ] );
                                        } }
                                    >
                                        { habitText }
                                    </button>
                                </div>
                            );
                        } ) }
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p>edit and create habits</p>
                        { habits.map( ( habit ) => {
                            return (
                                <div>
                                    <button
                                        key={ habit }
                                        onClick={ () => {
                                            setHabitDetail( [ habit.category, habit.description ] );
                                            setCurrentStep( 6 )
                                        } }
                                    >
                                        { habit.description } EDIT
                                    </button>
                                </div>
                            );
                        } ) }
                        <button
                            onClick={ () => {
                                setCurrentStep( 7 )
                            } }
                        >
                            write new habit
                        </button>
                    </div>

                );
            case 6:
                return (
                    <div>
                        <p>edit your habit</p>

                    </div>
                );
            case 7:
                return (
                    <div>
                        <p>create your habit</p>

                    </div>
                );
            case 8:
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
                                { currentStep !== 1 && currentStep !== 4 && (
                        <button type="button" onClick={ handlePrevStep }>
                            &lt; Backward
                        </button>
                                ) }
                                { currentStep === 4 && (
                                    <button type="button" onClick={ handlePrevStep }>
                                        &lt; Pick New Topics
                                    </button>
                                ) }
                                { currentStep !== 1 && currentStep !== totalSteps && currentStep !== 6 && currentStep !== 7 && (
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
