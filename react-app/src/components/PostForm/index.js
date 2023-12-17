import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import cloud from "./cloud.svg"
import { post } from "../../store/post";
import "./PostForm.css";

function PostForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const currentUser = useSelector( state => state.session.user )
    const progressSnapshot = useSelector( ( state ) => state.post.capturedImage );
    console.log( "snapshotttttt", progressSnapshot )

    const [ errors, setErrors ] = useState( "" );
    const [ text, setText ] = useState( "" );
    const [ image, setImage ] = useState();

    useEffect( () => {
        if ( progressSnapshot ) {
            setImage( progressSnapshot );
        }
    }, [ progressSnapshot ] );

    const fileInputRef = useRef( null );

    const handleFileChange = ( e ) => {
        const file = e.target.files[ 0 ];
        if ( file ) {
            setImage( URL.createObjectURL( file ) );
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        // console.log( "---------text", text )
        console.log( "---------image handlesubmit", image )
        if ( !image || image.length < 1 || image === "" ) {
            setImage( null )
        }

        // console.log( "handlesubmit data:", data )
        if ( !text ) {
            setErrors( "write something, silly" );
            console.error( "Error submitting post:", errors );
        } else {
            const data = dispatch( post( text, image ) );
            closeModal();
            history.push( "/community" );
        }
    };

    return (
        <div className="post-form-container" >
            <div className="post-grid">
                <div className="writing-container" >
                    {/* <div className="user-blurb" >
                    { currentUser.username }
                </div> */}
                    <textarea
                    value={ text }
                    placeholder="start typing....."
                    onChange={ ( e ) =>
                        setText( e.target.value ) }
                />
                    <div className={ text.length > 750 || text.length < 4 ? "valid char-count-red" : "valid char-count" }>
                        { text.length } / 750 characters
                    </div>
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
                            </div>
                    ) }

                </div>
            </div>


            <div className="upload-pic-button">
                {/* <input type="file" onChange={ handleFileChange } /> */ }
                    {/* <input type="file" onChange={ ( e ) => setImage( URL.createObjectURL( e.target.files[ 0 ] ) ) } /> */ }
                    {/* <button >cloud</button> */ }
                    {/* <i className="fas fa-regular fa-cloud-arrow-up"></i> */ }

                    <input
                        type="file"
                        ref={ fileInputRef }
                        style={ { display: "none" } }
                        onChange={ handleFileChange }
                    />

                    <div>
                    <button type="button" onClick={ handleButtonClick }>
                        <img className="upload" src={ cloud } alt="Upload Cloud" />
                        {/* <i className="fas fa-regular fa-cloud-arrow-up"></i>  */ }
                        </button>
                        { image && (
                            <button className="kill" onClick={ () => setImage( "" ) }>Remove</button>
                        ) }
                    </div>
                    <p>Share a snapshot of your progress or upload a photo</p>
            </div>
            {/* <ul>
                { errors.map( ( error, idx ) => {
                    let parts = error.split( ":" );
                    return <li key={ idx }>{ parts[ 1 ] }</li>;
                } ) }
            </ul> */}
            </div>

            <div className="share-button">
                <button type="submit" onClick={ handleSubmit }>Share With the Community</button>
            </div>

        </div>
    )
}

export default PostForm;
