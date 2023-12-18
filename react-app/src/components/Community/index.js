import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { allUserHabits, createHabit } from '../../store/habit';
import { fetchPosts } from '../../store/post';
import pencil from "./pencil-pen.svg"
import wave from "./communitywave.svg"
import { anxiety, relationships, exercise, wellness, stress, sleep, depression, productivity } from "../RoutineFormModal/Topics";
import PostForm from "../PostForm";
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
    const [ filteredPosts, setFilteredPosts ] = useState( [] );
    const [ filteredHabits, setFilteredHabits ] = useState( [] );

    // const handleSelectedHabit =  ( habit, routine ) => {
    //     const { description, category } = habit;
    //     const newHabit = await dispatch(
    //         createHabit( {
    //             routineId: routine.id,
    //             description: habit.description,
    //             category: habit.category
    //         } ) )
    // };

    useEffect( () => {
        const filterdddPosts = communityPosts.filter( post => {
            const postTopics = post.topics;
            return selectedTopics.some( topic => postTopics.includes( topic ) );
        } );
        setFilteredPosts( filterdddPosts );

        const filteredddHabits = communityHabits.filter( habit => selectedTopics.includes( habit.topic ) );
        setFilteredHabits( filteredddHabits );
    }, [ selectedTopics, communityPosts, communityHabits ] );


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
        <>
            <div>
                <div className="feed">
                    <h2>Surround yourself with support</h2>
                </div>
                <div
                    className="write-community"
                >
                    {/* <p>post about your progress</p> */ }
                    <OpenModalButton
                        modalComponent={ <PostForm showWarning={ false } /> }
                        buttonText={ <img className="pencil-community" src={ pencil } alt="Pencil Icon" /> }
                    />
                </div>
            </div>

            <div className="waveee">
                <img src={ wave } alt="Wave" />
            </div>

            <div className='community-container'>


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

                {/* filter these posts based on the selected topic- each post has array of 0-3 topics attached based on the user's routines
                    show post for every topic in its array but dont show same post duplicated */}

                { communityPosts ? (
                <div className="posts-container">
                        { filteredPosts
                            .map( ( post, index ) => {
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


                <h2>Check Out Other's Habits by Topic</h2>
                {/* start with wellness selected as default
                one topic must always be selected, max 3 topics
                */}

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
                {/*
                one to three topics will be selected

                filter community habits by topic

                show a max of 15 habits - either 5 habits per topic if 3 topics, up to 7 each if 2 topics, up to 15 if 1 topic
                for the habits per topic- show at random(not first five indexed etc)

                user should be able to add communtityHabit to any of their routines - user has between zero and 3 routines
                 if currentUser.Routines
                     but only if that routine has 14 or less habits (there is a maximum of 15 habits per routine)
                                routine.habits
                                                if ( habits.length >= 15 && !habits.some( ( h ) => h.description === description ) ) {
                                    alert( "You can only add up to 15 habits." );
                                return;
                                                }

                   under each habit, there should be a button per routine that says something like `add to ${routine.name}`

                dispatch new habit to the rout
                            const newHabit = await dispatch(
                                        createHabit( {
                                            routineId: routine.id,
                                            description: habit.description,
                                            category: habit.category
                                        } ) )
 */}


            { communityHabits ? (
                <div className="community-habit-steps-container">
                        { filteredHabits.map( ( habit, index ) => {
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
        </>
    );
}

export default Community
