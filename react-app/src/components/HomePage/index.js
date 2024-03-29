import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import waveSvg from "./52.svg"
// import waveSvg from "./56.svg"
// import waveSvg from "./wave.svg"
// import waveSvg from "./wav2.svg"
import waveSvg from "./redbottom.svg"
import pencil from "./pencil-pen.svg"
import { fetchPosts } from '../../store/post';
import "./HomePage.css"
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal"
import { createHabit } from "../../store/habit";
import ErrorModal from '../ErrorModal';
import PostForm from "../PostForm";

const HomePage = () => {
    const dispatch = useDispatch();

    const communityPosts = useSelector( ( state ) => state.post.all );
    const currentUser = useSelector( state => state.session.user )

    const ulRef = useRef()

    useEffect( () => {
        dispatch( fetchPosts() );
    }, [ dispatch ] );

    const [ showMenu, setShowMenu ] = useState( false );

    const closeMenu = ( e ) => {
        if ( !ulRef.current?.contains( e.target ) ) {
            setShowMenu( false );
        }
    };

    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        const timer = setTimeout( () => {
            setLoading( false );
        }, 1000 );

        return () => clearTimeout( timer );
    }, [] );

    if ( loading ) {
        return (
            <div className='loading'>
                <div className='no-user'>
                    <div className="dot-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="homepage-container">
            <div className="slogan">
                {/* <h1>We form habits, then our habits form us.</h1> */ }
                <h1>We form habits, </h1>
                <h1>then our habits form us.</h1>
                <h4>Commit to a routine, check in daily, and watch your life change. </h4>
            </div>
            <div className="home-background-container">
                <div className="wave-1">
                <img src={ waveSvg } alt="Wave" />
                </div>

            { communityPosts ? (
                    <div className="home-posts-container">

                        <div
                            className="write"
                            // onClick={ () => window.alert( "Posts coming soon" ) }
                        >

                        <p>Join the Discussion</p>
                            <OpenModalButton
                                modalComponent={
                                    currentUser ? ( <PostForm showWarning={ false } /> ) : ( <LoginFormModal /> )
                                }
                                buttonText={ <img className="pencil" src={ pencil } alt="Pencil Icon" /> }
                            />
                        </div>
                        <div className="posts-scroll">
                    { communityPosts.map( ( post, index ) => {
                        return (
                            <div className='home-post-tile' key={ index }>

                                { post.image && <img className="post-img" src={ post.image } /> }
                                <p className="home-post-content">
                                    { post.content }
                                </p>
                                <p className="home-post-user">
                                    - { post.user.username }
                                </p>
                            </div>
                        );
                    } ) }
                    </div>
                    </div>
            ) : (
                <p>No posts, whoops.</p>
            ) }

        </div>
        </div>
    )
}

export default HomePage
