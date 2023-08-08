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
            { error && <p>Error: { error }</p> }
            <h3>Are you sure you want to delete this routine?</h3>
            <button type="button" onClick={ handleDelete }>
                Delete
            </button>
            <p>Click out of this box to cancel</p>
            {/* cancel button triggers the are you sure warning :( */ }
            {/* <button type="button" onClick={ closeModal }>
                Cancel
            </button> */}
        </>
    );
}

export default RoutineDeleteForm;
