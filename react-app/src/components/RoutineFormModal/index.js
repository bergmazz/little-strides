import React, { useState } from "react";
// import { a, b, c, d, e, f, g, h } from "./Steps"
import { createRoutine } from "../../store/routine";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RoutineFormModal.css";

function RoutineFormModal () {
    const dispatch = useDispatch();
    const [ currentStep, setCurrentStep ] = useState( 1 );
    const [ routineName, setRoutineName ] = useState( "" );
    const [ coverImage, setCoverImage ] = useState( "" );
    const [ selectedTopics, setSelectedTopics ] = useState( [] );
    const [ topTopic, setTopTopic ] = useState( [ "" ] );
    const [ habits, setHabits ] = useState( [ "" ] );
    const [ habitDetail, setHabitDetail ] = useState( [ "" ] );
    const [ errors, setErrors ] = useState( [] );
    const { closeModal } = useModal();

    const totalSteps = 7;

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
        if ( currentStep === 7 ) {
            setCurrentStep( 5 );
        }
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        if ( currentStep === totalSteps ) {
            const data = await dispatch(
                createRoutine( {
                    name: routineName,
                    coverImage: coverImage,
                    topic: topTopic,
                } )
            );
            if ( data.errors ) {
                setErrors( data.errors );
            } else {
                closeModal();
            }
        } else {
            handleNextStep();
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
                        <p>topics</p>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <p>main topic</p>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <p>suggested habits</p>

                        <button type="button" onClick={ ( e ) => { setHabits( [ ...habits, e.target.value.desc, e.target.value.cat ] ) } }>
                            lil plus sign
                        </button>
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
            </>
    );
}


export default RoutineFormModal;
