import React, { useState, useEffect } from "react";
import { Step1 } from "./Steps"
import { fetchRoutines, createRoutine } from "../../store/routine";
import { suggestedHabits, createHabit } from "../../store/habit";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutineFormModal.css";
import { image1, image2, image3, image4, image5, image6 } from "./Covers";

function RoutineFormModal ( { routines } ) {
    const hasReachedLimit = routines && routines.length >= 3;
    const dispatch = useDispatch();
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ routineName, setRoutineName ] = useState( "My Daily Routine" );
    const [ coverImage, setCoverImage ] = useState( "" );
    const [ selectedTopics, setSelectedTopics ] = useState( [] );
    const [ topTopic, setTopTopic ] = useState( "" );
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

    const handleSelectedHabits = ( habit ) => {
        const { description, category } = habit;
        if ( habits.some( ( h ) => h.description === description ) ) {
            setHabits( ( habits ) => habits.filter( ( h ) => h.description !== habit.description ) );
        } else {
            setHabits( ( habits ) => [ ...habits, { description, category } ] );
        }
    };

    const handleEditHabits = ( habit, prevHabit = habit ) => {
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
        }
    };

    const isValidURL = ( url ) => {
        const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
        return pattern.test( url );
    };

    const validateImage = ( url, onSuccess, onError ) => {
        const img = new Image();

        img.onload = onSuccess;
        img.onerror = onError;

        img.src = url;
    };

    const handleSubmit = async ( e ) => {
        e.stopPropagation();
        e.preventDefault();
        // console.log( habits )
        // if ( currentStep === totalSteps ) {
        //     let i = isImgUrl( coverImage )
        //     if ( !i ) return
        // }
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
                                                let habit = { "category": habitTopic, "description": habitText }
                                                handleSelectedHabits( habit );
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
                        <div className="habitss">
                        { habits.map( ( habit, index ) => {
                            return (
                                <div className="row">
                                    <p>{ habit.description }</p>
                                    <button
                                        key={ [ index, habit.description ] }
                                        onClick={ () => {
                                            handleSelectedHabits( habit )
                                        } }
                                    > trash can
                                    </button>
                                    <button
                                        key={ index }
                                        onClick={ () => {
                                            setEditMe( habit )
                                            setHabitDetail( habit.description );
                                            setHabitCat( habit.category )
                                            setCurrentStep( 6 )
                                        } }
                                    > pencil icon
                                    </button>
                                </div>
                            );
                        } ) }
                        </div>
                        <button
                            className="newhabit"
                            onClick={ () => {
                                setHabitCat( "" )
                                setHabitDetail( "" )
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
                            value={ habitCat.toLowerCase() }
                            onChange={ ( e ) => setHabitCat( e.target.value ) }
                        >
                            { availableTopics.map( ( topic ) => (
                                <option key={ topic } value={ topic.toLowerCase() }>
                                    { topic }
                                </option>
                            ) ) }
                        </select>
                        <div className={ habitDetail.length > 75 ? "char-count-red" : "char-count" }>
                            { habitDetail.length } / 75 characters
                        </div>
                        <button
                            disabled={ !habitCat || !habitDetail || habitDetail.length > 75 }
                            onClick={ () => {
                                const habit = { "category": habitCat, "description": habitDetail }
                                handleEditHabits( habit, editMe )
                                //some sool confetti or something animated when you commit
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
                        <div className={ habitDetail.length > 75 ? "char-count-red" : "char-count" }>
                            { habitDetail.length } / 75 characters
                        </div>
                        <button
                            disabled={ !habitCat || !habitDetail || habitDetail.length > 75 }
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
                    <div className="covers">
                        <h2>Choose cover image</h2>
                        { !isValidURL( coverImage ) && coverImage.length > 5 && (
                            <p>Or please provide a valid image URL starting with http:// or https:// and ending with png, jpg, jpeg, gif, or svg.</p>
                        ) }
                        {/* <img className="cover" src="" onClick={ () => { setCoverImage( "" ) } } /> */ }
                        <div className="covers-imgs">
                        <img className="cover1" src={ image1 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg" ) } } />
                        <img className="cover2" src={ image2 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg" ) } } />
                            <img className="cover3" src={ image3 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg" ) } } />
                        <img className="cover4" src={ image4 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg" ) } } />
                            <img className="cover5" src={ image5 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg" ) } } />
                        <img className="cover6" src={ image6 } onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2309266/pexels-photo-2309266.jpeg" ) } } />
                        </div>
                        <input
                            type="text"
                            value={ coverImage }
                            onChange={ ( e ) => setCoverImage( e.target.value )
                            }
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
                    <div className="button-container">
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
