import React, { useState, useEffect } from "react";
// import { a, b, c, d, e, f, g, h } from "./Steps"
import { fetchRoutines, createRoutine } from "../../store/routine";
import { suggestedHabits, createHabit, deleteHabit } from "../../store/habit";
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
    const [ habits, setHabits ] = useState( [] );
    const [ editMe, setEditMe ] = useState( {} );
    const [ habitDetail, setHabitDetail ] = useState( [ "" ] );
    const [ habitCat, setHabitCat ] = useState( [ "" ] );
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

    const handleSelectedHabits = ( habit, prevHabit = habit ) => {
        const { description, category } = habit;
        if ( habits.some( ( h ) => h.description === description ) ) {
            setHabits( ( habits ) => habits.filter( ( h ) => h.description !== habit.description ) );
        } if ( habit !== prevHabit ) {
            const existingHabitIndex = habits.findIndex( ( h ) => h.description === prevHabit.description );
            if ( existingHabitIndex !== -1 ) {
                const updatedHabits = [ ...habits ];
                updatedHabits[ existingHabitIndex ] = { description, category };
                setHabits( updatedHabits );
            }
        } else {
            setHabits( ( habits ) => [ ...habits, { description, category } ] );
        }
    };

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
            if ( !routine.id && Array.isArray( routine ) ) {
                setError( routine[ 0 ] );
            } else {
                for ( let habit of habits ) {
                    const newHabit = await dispatch(
                    createHabit( {
                        routineId: routine.id,
                        description: habit.description,
                        category: habit.category
                    } ) )
                }
            }
            dispatch( fetchRoutines() );
            closeModal();
            }
        else {
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
                            setTopTopic( 'wellness' )
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
                    <div className="suggested-container">
                        <p>suggested habits</p>
                        <div className="suggested">
                        { suggested.map( ( habit, index ) => {
                            const [ habitText, habitTopic ] = habit.split( " !#*SPLIT " );
                            return (
                                <div>
                                    <button
                                        className={ `suggested-habit-button ${ habits.some( ( h ) => h.description === habitText ) ? "selected" : "" }` }
                                        key={ index }
                                        onClick={ () => {
                                            handleSelectedHabits( { "category": habitTopic, "description": habitText } );
                                        } }
                                    >
                                        { habitText }
                                    </button>
                                </div>
                            );
                        } ) }
                    </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <p>Own Your Habits</p>
                        { habits.map( ( habit, index ) => {
                            return (
                                <div>
                                    <p>{ habit.description }</p>
                                    {/* //actual delete for edit, oops: */ }
                                    {/* <button
                                        key={ habit.description }
                                        onClick={ () => {
                                            dispatch( deleteHabit( habit ) )
                                        } }
                                    > delete
                                    </button> */}
                                    <button
                                        key={ habit.description }
                                        onClick={ () => {
                                            handleSelectedHabits( habit )
                                        } }
                                    > delete
                                    </button>
                                    <button
                                        key={ index }
                                        onClick={ () => {
                                            setEditMe( habit )
                                            setHabitDetail( habit.description );
                                            setHabitCat( habit.category )
                                            setCurrentStep( 6 )
                                        } }
                                    > pencil
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
                        <textarea
                            value={ habitDetail }
                            onChange={ ( e ) =>
                                setHabitDetail( e.target.value ) }
                        />
                        <select
                            value={ habitCat }
                            onChange={ ( e ) => setHabitCat( e.target.value ) }
                        >
                            <option value="">Select a category</option>
                            { availableTopics.map( ( topic ) => (
                                <option key={ topic } value={ topic.toLowerCase() }>
                                    { topic }
                                </option>
                            ) ) }
                        </select>
                        <button
                            onClick={ () => {
                                const habit = { "category": habitCat, "description": habitDetail }
                                handleSelectedHabits( habit, editMe )
                                //some sool confetti or something animated when you commit
                                // setHabitCat( "" )
                                // setHabitDetail( "" )
                                setCurrentStep( 5 )
                            } }>
                            Commit!
                        </button>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <p>create your habit</p>
                        <input
                            type="text"
                            value={ habitDetail }
                            onChange={ ( e ) =>
                                setHabitDetail( e.target.value ) }
                        />
                        <select
                            value={ habitCat }
                            onChange={ ( e ) => setHabitCat( e.target.value ) }
                        >
                            <option value="">Select a category</option>
                            { availableTopics.map( ( topic ) => (
                                <option key={ topic } value={ topic.toLowerCase() }>
                                    { topic }
                                </option>
                            ) ) }
                        </select>
                        <button
                            onClick={ () => {
                                handleSelectedHabits( { "category": habitCat, "description": habitDetail } )
                                //some sool confetti or something animated when you commit
                                // setHabitCat( "" )
                                // setHabitDetail( "" )
                                setCurrentStep( 5 )
                            } }>
                            Commit!
                        </button>

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
                    <div className="create-routine-container">
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
