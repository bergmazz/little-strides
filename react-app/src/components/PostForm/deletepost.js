import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchPosts, deletePost } from "../../store/post";
import "./delete.css"

function PostDeleteForm ( { post } ) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ error, setError ] = useState( null );

    const handleDelete = async () => {
        const data = await dispatch( deletePost( post.id ) );
        if ( Array.isArray( data ) ) {
            setError( data[ 0 ] );
        } else {
            dispatch( fetchPosts() );
            closeModal();
        }
    };

    return (
        <div className="delete">
            { error && <p>Error: { error }</p> }
            <h3>{ `Are you sure you want to delete your post?` }</h3>
            <button type="button" onClick={ handleDelete }>
                Delete
            </button>
            {/* cancel button triggers the are you sure warning :( */ }
            <button type="button" onClick={ closeModal }>
                Cancel
            </button>
        </div>
    );
}

export default PostDeleteForm;
