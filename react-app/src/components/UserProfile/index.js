import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import RoutineFormModal from '../RoutineFormModal';
// import UserRoutines from "./";
import { fetchRoutines, createRoutine } from '../../store/routine';

function UserProfile () {
    // console.log( "------ in user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
    // console.log( "------user:", currentUser );
    const [ showMenu, setShowMenu ] = useState( false );
    const ulRef = useRef()

    const closeMenu = ( e ) => {
        if ( !ulRef.current.contains( e.target ) ) {
            setShowMenu( false );
        }
    };

    useEffect( () => {
        // console.log( "---------------Inside useEffect" );
        dispatch( fetchRoutines() );

        if ( !showMenu ) return;

        closeMenu()
        document.addEventListener( "click", closeMenu );

        return () => document.removeEventListener( "click", closeMenu );

    }, [ dispatch, showMenu ] );

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
            <OpenModalButton
                className='create-routine'
                buttonText="New Routine"
                onItemClick={ closeMenu }
                modalComponent={ <RoutineFormModal /> }
            />
            <h2>Your Routines</h2>
            { routines ? (
                routines.map( ( routine ) => (
                    <div key={ routine.id }>
                        <h3>{ routine.name }</h3>
                        <img src={ routine.coverImage } />
                        { routine.habits.map( ( habit ) => (
                            <div key={ habit.id }>
                                <h4>   { habit.description } </h4>
                                <p>  { habit.percent } % </p>
                                <p> { habit.streak }</p>
                                <p>  { habit.category } </p>
                            </div>
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
                    <>
                        <p>make a rotuine pal</p>
                        {/* <OpenModalButton
                        className='create-routine'
                        buttonText="Modify"
                        onItemClick={ closeMenu }
                        modalComponent={ <RoutineFormModal routine={routine} /> }
                    /> */}</>
            ) }
        </div>
    )
}

export default UserProfile;
