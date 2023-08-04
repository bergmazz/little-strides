import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { allUserHabits, createHabit } from '../../store/habit';

// import './Community.css';

function Community () {
    const dispatch = useDispatch();
    // const currentUser = useSelector( ( state ) => state.session.user );
    // const routines = useSelector( state => state.routine.routines )
    const communityHabits = useSelector( ( state ) => state.habit.all );

    useEffect( () => {
        dispatch( allUserHabits() );
    }, [ dispatch ] );

    // const addToRoutine = ( habitId, routineId ) => {
    //     dispatch( createHabit( habitId, routineId ) );
    // };

    return (
        <div>

            <h2>Your Feed</h2>
            <p>some posts</p>

            <h2>Community Habits</h2>
            { communityHabits ? (
                communityHabits.map( ( habit ) => (
                    <div className="habit-tile" key={ habit.id }>
                        <p>{ habit.description }</p>
                        {/* { routines ? (
                            routines.map( ( routine ) => (
                                <button
                                    className='add-habit-to-routine'
                                    onClick={ () => {
                                        addToRoutine( habit.id, routine.id );
                                    } }
                                >
                                    Add to { routine.name }
                                </button>
                            ) )
                        ) : (
                            <button>
                                Log in to add to routine
                            </button>
                        ) } */}

                    </div>
                ) )
            ) : (
                <p>No habits found in the community.</p>
            ) }
        </div>
    );
}

export default Community
