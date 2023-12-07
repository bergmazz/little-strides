import React, { useState, useEffect } from "react";
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 } from "./Steps"
import { fetchRoutines, createRoutine } from "../../store/routine";
import { suggestedHabits, createHabit } from "../../store/habit";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutineFormModal.css";

function RoutineFormModal ( { routines } ) {
    const dispatch = useDispatch();
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ routineName, setRoutineName ] = useState( "My Daily Routine" );
    const [ coverImage, setCoverImage ] = useState( "" );
    const [ selectedTopics, setSelectedTopics ] = useState( [] );
    const [ topTopic, setTopTopic ] = useState( selectedTopics[ 0 ] );
    const [ habits, setHabits ] = useState( [] );
    const [ habitDetail, setHabitDetail ] = useState( [ "" ] );
    const [ habitCat, setHabitCat ] = useState( [ "" ] );
    const [ suggestedFetched, setSuggestedFetched ] = useState( false );
    const [ error, setError ] = useState( [] );
    const [ editMe, setEditMe ] = useState( {} );

    const { closeModal } = useModal();

    const resetForm = () => {
        // setCurrentStep( 1 );
        setRoutineName( "" );
        setCoverImage( "" );
        setSelectedTopics( [] );
        setTopTopic( "" );
        setHabits( [] );
        setHabitDetail( [] );
        setHabitCat( [] );
        setSuggestedFetched( false );
        setError( [] );
        setEditMe( {} );
    };

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
        if ( currentStep === 5 && !habits && !selectedTopics ) {
            setCurrentStep( 2 );
        }
        if ( currentStep === 7 ) {
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

    const handleSelectedHabits = ( habit ) => {
        const { description, category } = habit;
        if ( habits.some( ( h ) => h.description === description ) ) {
            setHabits( ( habits ) => habits.filter( ( h ) => h.description !== habit.description ) );
        } else {
            setHabits( ( habits ) => [ ...habits, { description, category } ] );
        }
    };

    const handleSubmit = async ( e ) => {
        e.stopPropagation();
        e.preventDefault();
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
                        <Step1
                            routineName={ routineName }
                            setRoutineName={ setRoutineName }
                            setCurrentStep={ setCurrentStep }
                            setTopTopic={ setTopTopic }
                        />
                    </div>
                ); case 2:
                return (
                    <div>
                        <Step2
                            availableTopics={ availableTopics }
                            selectedTopics={ selectedTopics }
                            setSelectedTopics={ setSelectedTopics }
                        />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <Step3
                            selectedTopics={ selectedTopics }
                            topTopic={ topTopic }
                            setTopTopic={ setTopTopic }
                        />
                    </div>
                );
            case 4:
                return (
                    <div>
                        <Step4
                            suggested={ suggested }
                            habits={ habits }
                            handleSelectedHabits={ handleSelectedHabits }
                        />
                    </div>
                );
            case 5:
                return (
                    <div>
                        <Step5
                            habits={ habits }
                            handleSelectedHabits={ handleSelectedHabits }
                            setEditMe={ setEditMe }
                            setHabitDetail={ setHabitDetail }
                            setHabitCat={ setHabitCat }
                            setCurrentStep={ setCurrentStep }
                        />
                    </div>

                );
            case 6:
                return (
                    <div>
                        <Step6
                            habitDetail={ habitDetail }
                            setHabitDetail={ setHabitDetail }
                            habitCat={ habitCat }
                            setHabitCat={ setHabitCat }
                            availableTopics={ availableTopics }
                            setCurrentStep={ setCurrentStep }
                            habits={ habits }
                            setHabits={ setHabits }
                            editMe={ editMe }
                        />
                    </div>

                );
            case 7:
                return (
                    <div>
                        <Step7
                            habitDetail={ habitDetail }
                            setHabitDetail={ setHabitDetail }
                            habitCat={ habitCat }
                            setHabitCat={ setHabitCat }
                            availableTopics={ availableTopics }
                            setCurrentStep={ setCurrentStep }
                            habits={ habits }
                            setHabits={ setHabits }
                            handleSelectedHabits={ handleSelectedHabits }
                        />
                    </div>
                );
            case 8:
                return (
                    <div>
                        <Step8
                            coverImage={ coverImage }
                            setCoverImage={ setCoverImage }
                        />
                    </div>
                );
            default:
                return ( <p>oops, step not found</p> );
        }
    };

    return (
        <>
            <div className="create-routine-container">
                {/* <h1>Create New Routine - Step { currentStep }</h1> */ }
                <form onSubmit={ handleSubmit }>

                    <div className="step-content"> { stepContent( currentStep ) }</div>

                    <div className="button-container button-container-bottom">
                        { currentStep !== 1 && currentStep !== 4 && currentStep !== totalSteps && (
                            <button className="left" type="button" onClick={ handlePrevStep }>
                                &lt; Back it Up
                        </button>
                                ) }
                                { currentStep === 4 && (
                                    <button type="button" onClick={ handlePrevStep }>
                                        &lt; Pick New Topics
                                    </button>
                                ) }
                                { currentStep !== 1 && currentStep !== totalSteps && currentStep !== 6 && currentStep !== 7 && (
                            <button className="right" type="button" onClick={ handleNextStep }>
                                Onward &gt;
                        </button>
                        ) }
                        { currentStep === totalSteps && <button className="right" type="button" onClick={ () => setCurrentStep( 1 ) }>
                            &lt; Change Routine Name
                        </button> }
                        { currentStep === totalSteps && habits.length < 3 && <button className="rightish" type="button" onClick={ () => setCurrentStep( 5 ) }>
                            &lt; Set at least 3 habits to submit
                        </button> }
                        { currentStep === totalSteps && <button type="submit" disabled={ !coverImage || habits.length < 3 }>Submit</button> }

                </div>
                        </form>
            </div>
            </>
    );
}

export default RoutineFormModal;
