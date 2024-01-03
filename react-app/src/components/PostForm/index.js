import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import cloud from "./cloud.svg"
import { post, fetchPosts } from "../../store/post";
import "./PostForm.css";

function PostForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const currentUser = useSelector( state => state.session.user )
    const progressSnapshot = useSelector( ( state ) => state.post.capturedImage );
    // console.log( "snapshotttttt", progressSnapshot )

    const [ errors, setErrors ] = useState( "" );
    const [ text, setText ] = useState( "" );
    const [ image, setImage ] = useState();
    // const [ theFile, setTheFile ] = useState();

    useEffect( () => {
        if ( progressSnapshot ) {
            // console.log( "if porgresssnap ran:", progressSnapshot );
            setImage( progressSnapshot );
            // console.log( "image updated to progresssnap:", progressSnapshot );
        }
        // console.log( "State updated. New progressSnapshot:", progressSnapshot );
    }, [ progressSnapshot ] );

    const fileInputRef = useRef( null );
    const nodeRef = useRef( null );

    const blobToDataURL = ( blob ) => {
        return new Promise( ( resolve ) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve( reader.result );
            reader.readAsDataURL( blob );
        } );
    };

    useEffect( () => {
        // console.log( "---------noderef current:", nodeRef.current );
        const node = nodeRef.current
        // console.log( "---------node variable:", node )
        // const dataUrl = blobToPNG( node )
        // console.log( "---------data url variable:", dataUrl )
    }, [ nodeRef ] );

    const handleFileChange = async ( e ) => {
        const file = e.target.files[ 0 ];
        if ( file ) {
            //url for client-side preview
            const imageUrl = URL.createObjectURL( file );
            setImage( imageUrl );

            const img = new Image();
            img.onload = async () => {
                const dataUrl = await blobToDataURL( file );
                setImage( dataUrl );
                // setTheFile( file )
            };
            img.src = imageUrl;

        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        // console.log( "---------text", text )
        // console.log( "---------image handlesubmit", image )
        // console.log( "---------thefile handlesubmit", theFile )
        if ( !image || image.length < 1 || image === "" ) {
            console.log( "---------setting image to null handlesubmit" )
            setImage( null )
        }
        if ( !text ) {
            setErrors( "write something, silly" );
            console.error( "Error submitting post:", errors );
        } else {
            // const formData = new FormData();
            // formData.append( "text", text );
            // formData.append( "image", theFile );
            // await dispatch( post( formData ) );
            // await dispatch( post( text, theFile ) );
            dispatch( post( text, image ) );
            dispatch( fetchPosts() );
            closeModal();
            history.push( "/community" );
        }
    };

    return (
        <div className="post-form-container" >
            <div className="post-grid">
                <div className="writing-container" >
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
                    <div className="snapshot">
                    { image && (
                        <div>
                            <img
                                alt="not found"
                                src={ image }
                                    className="post-img"
                                    ref={ nodeRef }
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

                    <div className="buttonssss">
                    <button type="button" onClick={ handleButtonClick }>
                            <img className="upload" src={ cloud } alt="Upload Cloud" />
                        </button>
                        { image && (
                            <button className="kill" onClick={ () => setImage( "" ) }>Remove</button>
                        ) }
                    </div>
                    <p>Upload a photo, or share a snapshot of your progress, only if you wanna</p>
                </div>
            </div>

            <div className="share-button">
                <button type="submit" onClick={ handleSubmit }>Share With the Community</button>
            </div>

        </div>
    )
}

export default PostForm;
