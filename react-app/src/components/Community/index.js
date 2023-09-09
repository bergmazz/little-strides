import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { allUserHabits, createHabit } from '../../store/habit';
import { fetchPosts } from '../../store/post';

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


            <h2>Community Habits</h2>
            { communityHabits ? (
                // communityHabits.map( ( habit ) => (
                //     <div className="habit-tile" key={ habit.id }>
                //         <p>{ habit.description }</p>
                //         { routines ? (
                //             routines.map( ( routine ) => (
                //                 <button
                //                     className='add-habit-to-routine'
                //                     onClick={ () => {
                //                         addToRoutine( habit.id, routine.id );
                //                     } }
                //                 >
                //                     Add to { routine.name }
                //                 </button>
                //             ) )
                <div className="suggested">
                    { communityHabits.map( ( habit, index ) => {
                        // const [ habitText, habitTopic ] = habit.split( " !#*SPLIT " );
                        return (
                            <div className='community-habits' >
                                <button
                                    // className={ `suggested-habit-button ${ habits.some( ( h ) => h.description === habitText ) ? "selected" : "" }` }
                                    key={ index }
                                    // onClick={ () => {
                                    //     let habit = { "category": habitTopic, "description": habitText }
                                    //     handleSelectedHabit( habit, routine );
                                    // } }
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
