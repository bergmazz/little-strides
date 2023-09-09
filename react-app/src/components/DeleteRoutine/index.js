import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchRoutines, deleteRoutine } from "../../store/routine";
import "./delete.css"

function RoutineDeleteForm ( { routine } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ error, setError ] = useState( null );

    const handleDelete = async () => {
        const data = await dispatch( deleteRoutine( routine.id ) );
        if ( Array.isArray( data ) ) {
            setError( data[ 0 ] );
        } else {
            dispatch( fetchRoutines() );
            closeModal();
        }
    };

    return (
        <div className="delete">
            { error && <p>Error: { error }</p> }
            <h3>{ `Are you sure you want to delete ${ routine.name }?` }</h3>
            <button type="button" onClick={ handleDelete }>
                Delete
            </button>
            <p>(Click outside of this box to cancel)</p>
            {/* cancel button triggers the are you sure warning :( */ }
            {/* <button type="button" onClick={ closeModal }>
                Cancel
            </button> */}
        </div>
    );
}

export default RoutineDeleteForm;
