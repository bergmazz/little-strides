import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { allUserHabits, createHabit } from '../../store/habit';
import { fetchPosts } from '../../store/post';
import { anxiety, relationships, exercise, wellness, stress, sleep, depression, productivity } from "../RoutineFormModal/Topics";

import './Community.css';

function Community () {
    const dispatch = useDispatch();
    // const currentUser = useSelector( ( state ) => state.session.user );
    // const routines = useSelector( state => state.routine.routines )
    const communityHabits = useSelector( ( state ) => state.habit.all );
    const communityPosts = useSelector( ( state ) => state.post.all );
    useEffect( () => {
        dispatch( allUserHabits() );
        dispatch( fetchPosts() );
    }, [ dispatch ] );


    const [ selectedTopics, setSelectedTopics ] = useState( [] );

    // const handleSelectedHabit = ( habit, routine ) => {
    //     const { description, category } = habit;
    //     const newHabit = await dispatch(
    //         createHabit( {
    //             routineId: routine.id,
    //             description: habit.description,
    //             category: habit.category
    //         } ) )
    // };

    const availableTopics = [
        'Anxiety',
        'Relationships',
        'Exercise',
        'Stress',
        'Wellness',
        'Sleep',
        'Depression',
        'Productivity',
    ];

    const topicImages = {
        anxiety: anxiety,
        relationships: relationships,
        exercise: exercise,
        wellness: wellness,
        stress: stress,
        sleep: sleep,
        depression: depression,
        productivity: productivity,
    };

    const handleSelectTopics = ( selectedTopic ) => {
        if ( selectedTopics.includes( selectedTopic ) ) {
            setSelectedTopics( selectedTopics.filter( ( topic ) => topic !== selectedTopic ) )
        } else {
            if ( selectedTopics.length < 3 ) {
                setSelectedTopics( [
                    ...selectedTopics,
                    selectedTopic,
                ] );
            }
        }
    };

    return (
        <div className='community-container'>
            {/* <h1>***FEATURE IN PROGRESS!***</h1> */ }
            <h2 className="feed">Your Feed</h2>

            <div className="topics-feed-container">
                { availableTopics.map( ( topic ) => (
                    <button
                        key={ topic }
                        className={ `topic-button ${ selectedTopics.includes( topic ) ? 'chosen' : '' }` }
                        onClick={ () => handleSelectTopics( topic ) }
                    >
                        { topic }
                    </button>
                ) ) }
            </div>

            { communityPosts ? (
                <div className="posts-container">
                    { communityPosts.map( ( post, index ) => {
                        return (
                            <div className='post-tile' key={ index }>
                                { post.image && <img className="post-img" src={ post.image } /> }
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


            <h2>Browse Other's Habits by Topic</h2>

            <div>
                <div className="topics-container-one-row">
                    { availableTopics.map( ( topic ) => (
                        <button
                            key={ topic }
                            className={ `topic-button ${ selectedTopics.includes( topic ) ? "selected" : "" }` }
                            onClick={ () => handleSelectTopics( topic ) }
                        >
                            <img
                                src={ topicImages[ topic.toLowerCase() ] }
                                alt={ topic }
                            />
                        </button>
                    ) ) }
                </div>
            </div>

            { communityHabits ? (
                <div className="community-habit-steps-container">
                    { communityHabits.map( ( habit, index ) => {
                        if ( selectedTopics.includes( habit.topic ) )
                        // const [ habitText, habitTopic ] = habit.split( " !#*SPLIT " );
                        return (
                            <div className='community-habits' >
                                <button
                                    key={ index }
                                >
                                    { habit.description }
                                </button>
                            </div>
                        );
                    } ) }
                </div>


            ) : (
                <p>No habits found in the community.</p>
            ) }
        </div>
    );
}

export default Community
