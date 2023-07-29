import React, { useState } from "react";
import { newRoutine } from "../../store/routine";
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

    const totalSteps = 7;

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
                createNewRoutine( {
                    name: routineName,
                    coverImage: coverImage,
                    topics: selectedTopics,
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
                        {/* <Step1></Step1> */ }
                        {/* <label>
                            Routine Name
                            <input
                                type="text"
                                value={ routineName }
                                onChange={ ( e ) => setRoutineName( e.target.value ) }
                                required
                            />
                        </label>
                        <button type="button" onClick={ handleNextStep }>
                            Next
                        </button> */}
                    </div>
                ); case 2:
                return (
                    <div>
                        {/* <Step2></Step2> */ }
                    </div>
                );
        }



        return (
            <>
                <h1>Create New Routine - Step { currentStep }</h1>
                <form onSubmit={ handleSubmit }>
                    { stepContent() }
                </form>
            </>
        );
    }

    export default RoutineFormModal;
