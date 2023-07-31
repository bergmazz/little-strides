import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import { Link, useHistory } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
// import UserRoutines from "./";
import { fetchRoutines } from '../../store/routine';

function UserProfile () {
    console.log( "user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routines )

    useEffect( () => {
        console.log( 'Routines:', routines );
        console.log( "---------------Inside useEffect" );
        dispatch( authenticate() )
        dispatch( fetchRoutines() );
    }, [ dispatch ] );
    console.log( 'Routines:', routines );

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
            <h2>User Routines</h2>
            { routines ? (
                routines.map( ( routine ) => (
                    <div key={ routine.id }>
                        <h2>{ "Hello,  " }{ currentUser.username }</h2>
                        <h3>{ routine.rname }</h3>
                        <p>Cover Image: { routine.cover_image }</p>
                        <p>Topic: { routine.topic }</p>
                        <p>Habits: { routine.habits }</p>
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
