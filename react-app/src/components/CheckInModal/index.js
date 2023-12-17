import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createCheckin } from "../../store/checkin";
import { fetchRoutines } from '../../store/routine';
import { setCapturedImage } from "../../store/post";

import OpenModalButton from "../OpenModalButton";
import PostForm from "../PostForm";
import pencil from "./pencil-pen.svg"

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import "./CheckInModal.css";

function CheckinFormModal ( { habits } ) {
    const dispatch = useDispatch();
    const nodeRef = useRef();
    const { closeModal, setModalContent } = useModal();
    // const { closeModal } = useModal();
    const [ submitted, setSubmitted ] = useState( false )
    const [ yesPercentage, setYesPercentage ] = useState( 0 );
    const [ selectedAnswers, setSelectedAnswers ] = useState(
        habits.map( () => ( { completed: null } ) )
    );
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    // const [ capturedImage, setCapturedImage ] = useState( null );
    const BadgeShapes = [ 'star', 'shield', 'scalloped-circle' ];
    let badgeShapeIndex = 0;

    useEffect( () => {
        spinCarousel();
    }, [ currentCardIndex ] );

    useEffect( () => {
        dispatch( fetchRoutines() );
    }, [ submitted ] )

    const handleAnswerClick = ( index, completed ) => {
        // console.log( "answerclick currcardindex", currentCardIndex )
        const updatedAnswers = [ ...selectedAnswers ];
        updatedAnswers[ index ].completed = completed;
        setSelectedAnswers( updatedAnswers );
        // Rotate to the next card
        if ( index === habits.length - 1 ) {
            // ( changing current card calls spinCarousel in useEffect)
            setCurrentCardIndex( 0 )
        } else {
            setCurrentCardIndex( index + 1 );
        }
    };

    const handleSubmit = async () => {
        const hasNullAnswers = selectedAnswers.some( ( answer ) => answer.completed === null );

        if ( hasNullAnswers ) {
            alert( "Please answer all questions before submitting." );
        } else {
            habits.forEach( ( habit, index ) => {
                const completed = selectedAnswers[ index ].completed;
                dispatch( createCheckin( habit.id, completed ) );
            } );

            const totalResponses = selectedAnswers.length;
            const yesResponses = selectedAnswers.filter( ( answer ) => answer.completed === 1 ).length;
            const percentage = ( yesResponses / totalResponses ) * 100;
            setYesPercentage( percentage );

            dispatch( fetchRoutines() );
            setSubmitted( true )
            // closeModal()
        }
    };

    const spinCarousel = () => {
        const numberOfCards = habits.length;
        const cardWidth = 150;
        const angle = 360 / numberOfCards;
        const translateZ = Math.round(
            ( cardWidth / 2 ) / ( Math.tan( Math.PI / numberOfCards ) )
        );
        const carousel = document.querySelector( ".carousel" );
        if ( carousel ) {
            const cards = carousel.getElementsByClassName( "checkin-step" );
            for ( let i = 0; i < numberOfCards; i++ ) {
                let currangle = ( i - currentCardIndex ) * angle;

                const transformValue = `rotateY(${ currangle }deg) translateZ(${ translateZ }px)`;
                cards[ i ].style.transform = transformValue;

                if ( i === currentCardIndex ) {
                    cards[ i ].classList.add( "current" );
                } else {
                    cards[ i ].classList.remove( "current" );
                }
            }
        }
    };


    const loadFont = async ( url, fontName ) => {
        const fontContent = await fetch( url ).then( ( r ) => r.arrayBuffer() );
        const newFont = new FontFace( fontName, fontContent );

        return newFont.load().then( () => {
            document.fonts.add( newFont );
        } );
    };

    const appendFont = ( font, url ) => {
        const fontCss = document.createElement( "style" );
        const fontCssRule = `
      @font-face {
        font-family: "${ font }";
        src: url("${ url }");
      }`;

        fontCss.appendChild( document.createTextNode( fontCssRule ) );
        document.head.appendChild( fontCss );
    };

    // const handleCaptureImage = async () => {
    //     console.log( "ONCLICK WORKED!???" )
    //     console.log( "element", document.getElementById( 'progress-snapshot' ) )

    //     let node = document.getElementById( 'progress-snapshot' )
    //     await document.fonts.ready;
    //     const fontEmbedCSS = await htmlToImage.getFontEmbedCSS( node );
    const handleCaptureImage = useCallback( async () => {
        if ( nodeRef.current === null ) {
            return;
        }
        // Load the font dynamically
        await loadFont( 'your-font-url.woff2', 'YourFontName' );

        // Append @font-face rule
        await appendFont( 'YourFontName', 'your-font-url.woff2' );

        const options = {
            height: 195,
            width: 255,
            cacheBust: true,
            useCors: true,
            imagePlaceholder: "https://images.pexels.com/photos/6289065/pexels-photo-6289065.jpeg",
            preferredFontFormat: 'opentype',
            // fontEmbedCSS
            // fontEmbedCSS: '',
        };

        // const dataUrl = await htmlToImage.toPng( node, options );
        const dataUrl = await toPng( nodeRef.current, options );
        console.log( "data url", dataUrl )

        let img = new Image();
        img.src = dataUrl;
        console.log( "img", img )
        // setCapturedImage( img.src )
        dispatch( setCapturedImage( dataUrl ) );
        // console.log( "captured image", capturedImage )
        // await htmlToImage.toCanvas( document.getElementById( node ) )
        //     .then( function ( canvas ) {
        //         document.body.appendChild( canvas );
        //     } );

        await setModalContent( <PostForm showWarning={ false } /> );
    }, [ nodeRef ] )

        let hasStreak = false;
    let topHabit = habits[ 0 ]

    return (
        <div className="pointlesscompilingthing">
            { submitted ? (
                <div className="checkin-confirmation">
                    <h2>You're making strides!</h2>
                    <div className="progress-snapshot" id="progress-snapshot" ref={ nodeRef }>
                        <h1>{ Math.ceil( yesPercentage ) }% Yes Today</h1>
                        {/* <h4>{ yesPercentage.toFixed( 2 ) }% Last Week</h4> */ }
                        <div className="habitbadges">
                            { habits.map( ( habit ) => {
                                const shouldDisplayBadge = habit.streak > 1;
                                if ( shouldDisplayBadge ) {
                                    hasStreak = true
                                }
                                if ( habit.streak > topHabit.streak ) {
                                    topHabit = habit
                                }
                                const badgeShape = shouldDisplayBadge ? BadgeShapes[ badgeShapeIndex ] : '';
                                badgeShapeIndex = ( badgeShapeIndex + 1 ) % BadgeShapes.length;
                                // console.log( habits )
                                return (
                                    <div key={ habit.id } className={ `habit ${ badgeShape }` }>
                                        { shouldDisplayBadge && (
                                            <div className={ `streak-badge ${ badgeShape }` }>
                                                { badgeShape === 'star' && (
                                                    <span className="fa-stack">
                                                        <i className="fas fa-star fa-stack-2x"></i>
                                                        <i className="fas fa-stack-1x streak-number">{ habit.streak }</i>
                                                    </span>
                                                ) }
                                                { badgeShape === 'shield' && (
                                                    <span className="fa-stack">
                                                        <i className="fas fa-heart fa-stack-2x"></i>
                                                        <i className="fas fa-stack-1x streak-number">{ habit.streak }</i>
                                                    </span>
                                                ) }
                                                { badgeShape === 'scalloped-circle' && (
                                                    <span className="fa-stack">
                                                        <i className="fas fa-certificate fa-stack-2x"></i>
                                                        <i className="fas fa-stack-1x streak-number">{ habit.streak }</i>
                                                    </span>
                                                ) }
                                            </div>
                                        ) }
                                    </div>
                                );
                            } ) }
                            { !hasStreak && (
                                <p>
                                    You haven't hit any streaks... yet!
                                </p>
                            ) }
                        </div>
                        <h4>Your Longest Streak:</h4>
                        <i className="fas fa-fire"></i> { `   ${ topHabit.description }` }
                        <h4>{ `${ topHabit.streak } check ins in a row` }</h4>
                    </div>
                    <div className="to-post-or-not-to-post">
                        <button onClick={ closeModal }>No thanks</button>
                        {/* <OpenModalButton
                            onClick={ handleCaptureImage }
                            modalComponent={ <PostForm showWarning={ false } /> }
                            buttonText="post progress"
                        // { <img className="pencil" src={ pencil } alt="Pencil Icon" /> }
                        /> */}
                        <button onClick={ handleCaptureImage }>Post progress</button>
                    </div>

                </div>
            ) : (
                    <div className="checkin-form-container">
                        <h2>How did your routine go today? </h2>
                        <div className="checkin-steps-container">
                            <div className="carousel">
                { habits.map( ( habit, index ) => (
                    <div key={ habit.id } className="checkin-step">
                        <div className="desc">
                            <p>{ habit.description }</p>
                        </div>
                        <div className="checkin-options">
                            <button
                                onClick={ () => handleAnswerClick( index, 1 ) }
                                className={ selectedAnswers[ index ].completed === 1 ? "selected next-button" : "next-button" }
                                disabled={ index !== currentCardIndex }
                            >
                                Yes
                            </button>
                            <button
                                onClick={ () => handleAnswerClick( index, 0 ) }
                                className={ selectedAnswers[ index ].completed === 0 ? "selected next-button" : "next-button" }
                                disabled={ index !== currentCardIndex }
                            >
                                Not Today
                            </button>
            </div>
                    </div>
                ) ) }
                        </div>
                        </div>
            <div className="sub">
                <button onClick={ handleSubmit }>Submit</button>
            </div>
        </div>
            )
            }
        </div >
    );
}

export default CheckinFormModal;
