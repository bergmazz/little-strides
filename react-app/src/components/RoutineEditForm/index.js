import React, { useState, useEffect } from "react";
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8 } from "./Steps"
import { editRoutine, fetchRoutines } from "../../store/routine";
import { suggestedHabits, createHabit, editHabit, deleteHabit } from "../../store/habit";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutineEdit.css";

function RoutineEditForm ( { existingRoutine } ) {
    // console.log( "-------------existingRoutine edit form initial data:", existingRoutine )
    const dispatch = useDispatch();
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ routineName, setRoutineName ] = useState( "" );
    const [ coverImage, setCoverImage ] = useState( "" );
    const [ selectedTopics, setSelectedTopics ] = useState( [] );
    const [ topTopic, setTopTopic ] = useState( "" );
    const [ habits, setHabits ] = useState( [ "" ] );
    const [ habitDetail, setHabitDetail ] = useState( [ "" ] );
    const [ habitCat, setHabitCat ] = useState( [ "" ] );
    const [ suggestedFetched, setSuggestedFetched ] = useState( false );
    const [ habitsToDelete, setHabitsToDelete ] = useState( [] );
    const [ habitsToEdit, setHabitsToEdit ] = useState( [] );
    const [ editMe, setEditMe ] = useState( {} );
    const [ error, setError ] = useState( [] );
    const [ confetti, setConfetti ] = useState( false )

    const suggested = useSelector( ( state ) => state.habit.suggested );
    // const userHabits = useSelector( ( state ) => state.habit.user );

    const { closeModal } = useModal();

    useEffect( () => {
        setRoutineName( existingRoutine.name || "" );
        setCoverImage( existingRoutine.coverImage || "" );
        // setSelectedTopics( [ existingRoutine.mainTopic.toLowerCase() ] || [] );
        setTopTopic( existingRoutine.mainTopic.toLowerCase() || "" );
        setHabits( existingRoutine.habits || [] );
    }, [ existingRoutine ] );


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

    useEffect( () => {
        if ( currentStep === 3 && !suggestedFetched ) {
            dispatch( suggestedHabits( selectedTopics ) );
            setSuggestedFetched( true );
        }
        if ( currentStep !== 3 ) {
            setSuggestedFetched( false );
        }
    }, [ dispatch, currentStep, suggestedFetched, selectedTopics ] );

    const totalSteps = 8;

    // this only works when refreshing the page - see showWarning in Modal.js for exit modal warning
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

    const handleSelectedHabits = ( habit ) => {
        const { description, category } = habit;

        if ( habits.length >= 15 && !habits.some( ( h ) => h.description === description ) ) {
            alert( "You can only add up to 15 habits." );
            return;
        }

        if ( habits.some( ( h ) => h.description === description ) ) {
            setHabits( ( habits ) => habits.filter( ( h ) => h.description !== description ) );
        } else {
            setHabits( ( habits ) => [ ...habits, { description, category } ] );
        }
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
// TO DO add more submit buttons so user doesn't have to click through every step to chnage the routine name etc
        if ( habits.length >= 3 && currentStep === totalSteps ) {
            const routine = await dispatch(
                editRoutine( {
                    rname: routineName,
                    cover_image: coverImage,
                    topic: topTopic,
                    id: existingRoutine.id
                } )
            );
            if ( !routine.id && Array.isArray( routine ) ) {
                setError( routine[ 0 ] );
            } else {
                if ( habitsToDelete.length ) {
                    for ( let id of habitsToDelete ) {
                        const deletedHabit = await dispatch(
                            deleteHabit( { id: id, routineId: existingRoutine.id } ) )
                    }
                    setHabitsToDelete( [] )
                }
                if ( habitsToEdit.length ) {
                    for ( let habit of habitsToEdit ) {
                        console.log( "habits in habitsToEdit", habitsToEdit )
                        const updatedHabit = await dispatch(
                            editHabit( {
                                routineId: existingRoutine.id,
                                id: habit.id,
                                description: habit.description,
                                category: habit.category.toLowerCase()
                            } ) )
                    }
                    // setHabitsToEdit( [] )
                }

                const existingDescriptions = existingRoutine.habits.map( ( h ) => h.description );
                let newHabits = habits.filter(
                    ( h ) => !existingDescriptions.includes( h.description )
                );
                newHabits = newHabits.filter(
                    ( h ) => !habitsToEdit.some( ( editedHabit ) => editedHabit.description === h.description )
                );
                setHabitsToEdit( [] )
                console.log( "Habits:", habits );
                console.log( "New Habits:", newHabits );
                for ( let habit of newHabits ) {
                // if ( !habit.id ) {
                        const newHabit = await dispatch(
                            createHabit( {
                                routineId: routine.id,
                                description: habit.description,
                                category: habit.category
                            } ) )
                    // }
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
                            selectedTopics={ selectedTopics }
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
                            habitsToDelete={ habitsToDelete }
                            setHabitsToDelete={ setHabitsToDelete }
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
                            habitsToEdit={ habitsToEdit }
                            setHabitsToEdit={ setHabitsToEdit }
                        />
                    </div>

                    // <div>
                    //     <h1>edit your habit</h1>
                    //     <textarea
                    //         value={ habitDetail }
                    //         onChange={ ( e ) =>
                    //             setHabitDetail( e.target.value ) }
                    //     />
                    //     <select
                    //         value={ habitCat.toLowerCase() }
                    //         onChange={ ( e ) => setHabitCat( e.target.value ) }
                    //     >
                    //         { availableTopics.map( ( topic ) => (
                    //             <option key={ topic } value={ topic.toLowerCase() }>
                    //                 { topic }
                    //             </option>
                    //         ) ) }
                    //     </select>
                    //     <div className={ habitDetail.length > 75 ? "char-count-red" : "char-count" }>
                    //         { habitDetail.length } / 75 characters
                    //     </div>
                    //     <button
                    //         disabled={ !habitCat || !habitDetail || habitDetail.length > 75 }
                    //         onClick={ () => {
                    //             const habit = { "category": habitCat, "description": habitDetail, "id": editMe.id }
                    //             handleEditHabits( habit, editMe )
                    //             setHabitsToEdit( [ ...habitsToEdit, habit ] )
                    //             //some sool confetti or something animated when you commit
                    //             // setHabitCat( "" )
                    //             // setHabitDetail( "" )
                    //             setCurrentStep( 5 )
                    //         } }>
                    //         Commit!
                    //     </button>
                    // </div>
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
                            confetti={ confetti }
                            setConfetti={ setConfetti }
                        />
                    </div>
                    // <div>
                    //     <h1>create your habit</h1>
                    //     <input
                    //         type="text"
                    //         value={ habitDetail }
                    //         onChange={ ( e ) => {
                    //             setHabitDetail( e.target.value )
                    //         } }
                    //     />
                    //     <select
                    //         value={ habitCat }
                    //         onChange={ ( e ) => setHabitCat( e.target.value ) }
                    //     >
                    //         <option value="">Select a category</option>
                    //         { availableTopics.map( ( topic ) => (
                    //             <option key={ topic } value={ topic.toLowerCase() }>
                    //                 { topic }
                    //             </option>
                    //         ) ) }
                    //     </select>
                    //     <div className={ habitDetail.length > 75 ? "char-count-red" : "char-count" }>
                    //         { habitDetail.length } / 75 characters
                    //     </div>
                    //     <button
                    //         disabled={ !habitCat || !habitDetail || habitDetail.length > 75 }
                    //         onClick={ () => {
                    //             handleSelectedHabits( { "category": habitCat, "description": habitDetail } )
                    //             setConfetti( true );
                    //             setTimeout( () => {
                    //                 setCurrentStep( 5 );
                    //                 setConfetti( false );
                    //             }, 2000 );
                    //         } }>
                    //         Commit!
                    //     </button>
                    //     { confetti && <div className="confetti" /> }

                    // </div>
                );
            case 8:
                return (
                    <div>
                        <Step8
                            coverImage={ coverImage }
                            setCoverImage={ setCoverImage }
                            routineName={ routineName }
                        />
                    </div>
                    // <div className="covers">
                    //     <h2>Choose cover image</h2>
                    //     { !isValidURL( coverImage ) && coverImage.length > 5 && (
                    //         <p>Or please provide a valid image URL starting with http:// or https:// and ending with png, jpg, jpeg, gif, or svg.</p>
                    //     ) }
                    //     {/* <img className="cover" src="" onClick={ () => { setCoverImage( "" ) } } /> */ }
                    //     <img className="cover1" src="https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg" onClick={ () => { setCoverImage( "https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg" ) } } />
                    //     <img className="cover2" src="https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg" onClick={ () => { setCoverImage( "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg" ) } } />
                    //     <img className="cover3" src="https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg" onClick={ () => { setCoverImage( "  https://images.pexels.com/photos/2627945/pexels-photo-2627945.jpeg" ) } } />
                    //     <img className="cover4" src="https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg" onClick={ () => { setCoverImage( "https://images.pexels.com/photos/4388593/pexels-photo-4388593.jpeg" ) } } />
                    //     <img className="cover5" src="https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg" onClick={ () => { setCoverImage( "  https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg" ) } } />
                    //     <img className="cover6" src="https://images.pexels.com/photos/2309266/pexels-photo-2309266.jpeg" onClick={ () => { setCoverImage( "https://images.pexels.com/photos/2309266/pexels-photo-2309266.jpeg" ) } } />
                    //     <input
                    //         type="text"
                    //         value={ coverImage }
                    //         onChange={ ( e ) => setCoverImage( e.target.value )
                    //         }
                    //     />

                    // </div>
                );
            default:
                return ( <p>oops, step not found</p> );
        }
    };

    return (
        <div className="create-routine-container">
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
                    { currentStep === totalSteps && habits.length >= 3 && <button className="rightish" type="button" onClick={ () => setCurrentStep( 5 ) }>
                        &lt; Back to edit them habits
                    </button> }
                    { currentStep === totalSteps && <button type="submit" disabled={ !coverImage || habits.length < 3 }>Submit!!!</button> }

                </div>
                {/* <div>
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
                </div> */}
            </form>
        </div>
    );
}



export default RoutineEditForm;
