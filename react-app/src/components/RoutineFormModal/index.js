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
    const [ errors, setErrors ] = useState( [] );
    const { closeModal } = useModal();

    const totalSteps = 8;

    const handleNextStep = () => {
        if ( currentStep < totalSteps ) {
            setCurrentStep( ( prevStep ) => prevStep + 1 );
        }
    };

    const handlePrevStep = () => {
        if ( currentStep > 1 ) {
            setCurrentStep( ( prevStep ) => prevStep - 1 );
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
                        <p>hi!</p>
                        {/* <a></a> */ }
                    </div>
                ); case 2:
                return (
                    <div>
                        {/* <b></b> */ }
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
                </form>
            </>
    );
}


export default RoutineFormModal;
