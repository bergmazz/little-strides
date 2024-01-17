import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { useModal } from "../../context/Modal";
import { allUserHabits, createHabit } from '../../store/habit';
import { fetchPosts } from '../../store/post';
import { fetchRoutines } from '../../store/routine';
import pencil from "./pencil-pen.svg"
import pencilonly from "./pencilonly.svg"
import trash from "./trash.svg"
import wave from "./communitywave.svg"
import { anxiety, relationships, exercise, wellness, stress, sleep, depression, productivity } from "../RoutineFormModal/Topics";
import PostForm from "../PostForm";
import PostEditForm from "../PostEditForm"
import PostDeleteForm from "../PostDeleteForm"
import './Community.css';

function Community () {
    const dispatch = useDispatch();
    const currentUser = useSelector( ( state ) => state.session.user );
    const routines = useSelector( state => state.routine.routines )
    const communityHabits = useSelector( ( state ) => state.habit.all );
    const communityPosts = useSelector( ( state ) => state.post.all );
    const [ showH2, setShowH2 ] = useState( false );
    const { closeModal, setModalContent } = useModal();

    useEffect( () => {
        dispatch( allUserHabits() );
        dispatch( fetchPosts() );
        dispatch( fetchRoutines() )
    }, [ dispatch ] );

    useEffect( () => {
        dispatch( fetchPosts() );
        setFilteredPosts( communityPosts )
    }, [ communityPosts.length ] );


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

    const [ selectedTopics, setSelectedTopics ] = useState( availableTopics );
    const [ filteredPosts, setFilteredPosts ] = useState( [] );
    const [ filteredHabits, setFilteredHabits ] = useState( [] );

    const handleSelectedHabit = async ( habit, routine ) => {
        if ( routine.habits.some( ( h ) => h.description === habit.description ) ) {
            alert( "You already have that sameee one!!" );
            return
        }
        if ( routine.habits.length <= 14 ) {
            const newHabit = await dispatch(
                createHabit( {
                    routineId: routine.id,
                    description: habit.description,
                    category: habit.category.toLowerCase()
                } ) )
            if ( newHabit.id ) {
                alert( "You added it!!!!" );
            }
        } else {
            alert( "You can only add up to 15 habits." );
        }

    };


    useEffect( () => {
        const filterdddPosts = communityPosts.filter( post => {
            const postTopics = post.topics;
            return selectedTopics.some( topic => postTopics.includes( topic ) );
        } );
        setFilteredPosts( filterdddPosts );

        const filteredddHabits = communityHabits.filter( habit => selectedTopics.includes( habit.topic ) );
        setFilteredHabits( filteredddHabits );
    }, [ selectedTopics, communityPosts, communityHabits ] );



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
        }
        else {
            // if ( selectedTopics.length < 3 ) {
                setSelectedTopics( [
                    ...selectedTopics,
                    selectedTopic,
                ] );
            // }
        }
    };

    useEffect( () => {
        const timer = setTimeout( () => {
            setShowH2( true );
        }, 4000 );
        return () => clearTimeout( timer );
    }, [] );

    if ( !currentUser ) return (
        <div className='loading'>
            <div className='no-user'>
                <div className="dot-spin" />
            </div>
            { showH2 && <h3>It's been a sec, did you actually log in?</h3> }
        </div>
    )


    return (
        <>
            <div>
                <div className="feed">
                    <h2>Surround yourself</h2>
                    <h2>with support</h2>
                </div>
                <div
                    className="write-community"
                >
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
                <h1>Filter your feed by topic</h1>
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
                                { post.user.username === currentUser.username && (
                                    < div className="postrow">
                                        <button
                                            className="deletepostbutt"
                                            onClick={ async () => {
                                                await setModalContent( <PostDeleteForm showWarning={ false } post={ post } /> );
                                            } }
                                        >
                                            <img src={ trash } alt="delete"></img>
                                        </button>

                                        <div className="editpostbutt">
                                            <button
                                                onClick={ async () => {
                                                    await setModalContent( <PostEditForm showWarning={ false } post={ post } /> );
                                                } }
                                            >
                                                <img src={ pencilonly } alt="edit"></img>
                                            </button>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        );
                    } ) }
                </div>
            ) : (
                <p>No posts, whoops.</p>
            ) }

                {/* <div className="topics-feed-container">
                { availableTopics.map( ( topic ) => (
                    <button
                        key={ topic }
                        className={ `topic-button ${ selectedTopics.includes( topic ) ? 'chosen' : '' }` }
                        onClick={ () => handleSelectTopics( topic ) }
                    >
                        { topic }
                    </button>
                ) ) }
            </div> */}
                <h1 className='checkitouttt'>Check Out Other's Habits In Your Community!</h1>

                <div>
                    { communityHabits ? (
                        <div className="community-habits-container">
                            { communityHabits.map( ( habit, index ) => {
                                return (
                                    <div key={ habit.id } className="habitcard">
                                        <div className="desc">
                                            <p>{ habit.description }</p>
                                        </div>
                                        <div className="routine-options">
                                            { currentUser && routines.map( ( routine ) => (
                                                <button
                                                    key={ routine.id }
                                                    onClick={ () => handleSelectedHabit( habit, routine ) }
                                                    className="routine-button"
                                                >
                                                    Add to { routine.name }
                                                </button>
                                            ) ) }
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
            ) : (
                <p>No habits found in the community.</p>
                    ) }
            </div>

            </div>

        </>
    );
}

export default Community
