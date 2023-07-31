import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
// import UserRoutines from "./";
import { fetchRoutines } from '../../store/routine';

function UserProfile () {
    console.log( "------ in user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
    console.log( "------user:", currentUser );

    useEffect( () => {
        // console.log( "---------------Inside useEffect" );
        dispatch( fetchRoutines() );
    }, [ dispatch ] );

    console.log( 'Routinesssss:', routines );

    if ( !currentUser ) return (
        <div className='no-user'>
            <h1 className='no-user'>Sorry, you need to log in</h1>
            <Link to="/login" className="page-login-link">
                <button className="login-signup-button" type="submit">Login</button>
            </Link>
        </div>
    )

    return (
        <div>
            <h2>{ "Hello,  " }{ currentUser.username }</h2>
            <h2>Your Routines</h2>
            { routines ? (
                routines.map( ( routine ) => (
                    <div key={ routine.id }>
                        <h3>{ routine.rname }</h3>
                        <p>Cover Image: { routine.coverImage }</p>
                        { routine.habits.map( ( habit ) => (
                            <li key={ habit.id }>
                                <strong>Category:</strong> { habit.category }
                                <br />
                                <strong>Description:</strong> { habit.description }
                                <br />
                                <strong>Completion Percentage:</strong> { habit.percent }%
                                <br />
                                <strong>Streak:</strong> { habit.streak }
                            </li>
                        ) ) }
                        {/* <OpenModalButton
                        className='edit-routine'
                        buttonText="Modify"
                        onItemClick={ closeMenu }
                        modalComponent={ <RoutineFormModal routine={routine} /> }
                    /> */}
                        {/* <OpenModalButton
                        className='kill-routine'
                        buttonText="Delete"
                        modalComponent={ <DeleteRoutine routine={ routine } /> }
                    /> */}
                    </div>
                ) ) ) : (
                <p>no rotuines sry</p>

            ) }
        </div>
    )
}

export default UserProfile;
