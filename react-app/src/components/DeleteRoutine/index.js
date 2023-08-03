import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchRoutines, deleteRoutine } from "../../store/routine";

function RoutineDeleteForm ( { routineId } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ error, setError ] = useState( null );

    const handleDelete = async () => {
        const data = await dispatch( deleteRoutine( routineId ) );
        if ( Array.isArray( data ) ) {
            setError( data[ 0 ] );
        } else {
            dispatch( fetchRoutines() );
            closeModal();
        }
    };

    return (
        <>
            <h1>Delete Routine</h1>
            { error && <p>Error: { error }</p> }
            <p>Are you sure you want to delete this routine?</p>
            <button type="button" onClick={ handleDelete }>
                Delete
            </button>
            <button type="button" onClick={ closeModal }>
                Cancel
            </button>
        </>
    );
}

export default RoutineDeleteForm;
