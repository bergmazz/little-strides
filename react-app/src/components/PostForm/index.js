import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import { post } from "../../store/post";
import "./PostForm.css";

function PostForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const currentUser = useSelector( state => state.session.user )

    const [ errors, setErrors ] = useState( "" );
    const [ text, setText ] = useState( "" );
    const [ image, setImage ] = useState( "" );

    // const handleFileChange = async ( e ) => {
    //     e.preventDefault();
    //     console.log( "fileeeee in handleChange", e.target.files );
    //     setImage( URL.createObjectURL( e.target.files[ 0 ] ) );
    //     console.group( "the image now?", image )
    // }

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        // console.log( "---------text", text )
        console.log( "---------image handlesubmit", image )
        // if ( image.length < 1 ) {
        //     setImage( null )
        // }
        const data = dispatch( post( text, image ) );
        // console.log( "handlesubmit data:", data )
        if ( !data.text ) {
            setErrors( data );
            console.error( "Error submitting post:", errors );
        } else {
            closeModal();
            history.push( "/community" );
        }
    };

    return (
        <div className="post-form-container" >

            <div className="writing-container" >

                <div className="user-blurb" >
                    { currentUser.username }
                </div>

                <input
                    type="text"
                    value={ text }
                    placeholder="start typing....."
                    onChange={ ( e ) =>
                        setText( e.target.value ) }
                />

            </div>

            <div className="post-image-container" >
                <div className="progress-snapshot" >
                    { image && (
                        <div>
                            <img
                                alt="not found"
                                src={ image }
                                className="post-img"
                            />
                            <br />
                            <button onClick={ () => setImage( "" ) }>Remove</button>
                        </div>
                    ) }

                </div>
            </div>

            <div className="upload-pic-button">
                {/* <input type="file" onChange={ handleFileChange } /> */ }
                <input type="file" onChange={ ( e ) => setImage( URL.createObjectURL( e.target.files[ 0 ] ) ) } />
                {/* <button >cloud</button> */ }
                <p>Share a snapshot of your progress or upload a photo</p>
            </div>
            {/* <ul>
                { errors.map( ( error, idx ) => {
                    let parts = error.split( ":" );
                    return <li key={ idx }>{ parts[ 1 ] }</li>;
                } ) }
            </ul> */}
            <div className="share-button">
                <button type="submit" onClick={ handleSubmit }>Share With the Community</button>
            </div>

        </div>
    )
}

export default PostForm;
