import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import waveSvg from "./52.svg"
// import waveSvg from "./56.svg"
// import waveSvg from "./wave.svg"
import waveSvg from "./wav2.svg"
import { fetchPosts } from '../../store/post';
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const communityPosts = useSelector( ( state ) => state.post.all );

    useEffect( () => {
        dispatch( fetchPosts() );
    }, [ dispatch ] );

    return (
        <div className="homepage-container">
            <div className="slogan">
                {/* <h1>We form habits, then our habits form us.</h1> */ }
                <h1>We form habits, </h1>
                <h1>then our habits form us.</h1>
                <h4>Commit to a routine, check in daily, and watch your life change. </h4>
            </div>
            <div className="wave-1">
                <img src={ waveSvg } alt="Wave" />
            </div>
            { communityPosts ? (
                <div className="posts-container">
                    <div className="write">
                        <p>Join the Discussion</p>
                        <button>pencil icon</button>
                    </div>
                    { communityPosts.map( ( post, index ) => {
                        return (
                            <div className='post-tile' key={ index }>

                                <img className="post-img" src={ post.image } />
                                <p className="post-content">
                                    { post.content }
                                </p>
                                <p className="post-user">
                                    - { post.user.username }
                                </p>
                            </div>
                        );
                    } ) }
                </div>
            ) : (
                <p>No posts, whoops.</p>
            ) }
        </div>
    )
}

export default HomePage
