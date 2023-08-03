import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
// import UserRoutines from "./";
// import UserProgress from "./";
import { fetchRoutines, createRoutine, editRoutine } from '../../store/routine';
import "./UserProfile.css"
function UserProfile () {
    // console.log( "------ in user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
    // console.log( "------user:", currentUser );
    const [ showMenu, setShowMenu ] = useState( false );
    const [ showError, setShowError ] = useState( false );
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

    const handleNewRoutineClick = () => {
        if ( routines.length >= 3 ) {
            setShowError( true );
        } else {
            setShowError( false );
            closeMenu
        }
    };
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
                className="create-routine"
                buttonText="New Routine"
                onItemClick={ handleNewRoutineClick }
                modalComponent={ <RoutineFormModal /> }
            />

            { showError && (
                <div className="error-popup">
                    <p>You already have 3 routines. Please delete one to create another.</p>
                    <button onClick={ () => setShowError( false ) }>Close</button>
                </div>
            ) }

            <h2>Your Routines</h2>
            { routines ? (
                routines.map( ( routine ) => (
                    <div className="routine-tile" key={ routine.id }>
                        <img className="routine-img" alt={ routine.name } src={ routine.coverImage } />
                        <h3>{ routine.name }</h3>
                        { routine.habits.map( ( habit ) => (
                            <div key={ habit.id }>
                                <div className='habit-bubble'>   { habit.description } </div>
                                {/* <p>  { habit.percent } % yes </p>
                                <p> { habit.streak } days in a row</p>
                                 <p>  { habit.category } </p> */}
                            </div>
                        ) ) }
                        <OpenModalButton
                        className='edit-routine'
                        buttonText="Modify"
                        onItemClick={ closeMenu }
                            modalComponent={ <RoutineEditForm existingRoutine={ routine } /> }
                        />
                        <button>Delete</button>
                        {/* <OpenModalButton
                        className='kill-routine'
                        buttonText="Delete"
                        modalComponent={ <DeleteRoutine routine={ routine } /> }
                    /> */}
                    </div>
                ) ) ) : (
                    <>
                        <p>make a routine pal</p>
                        {/* <OpenModalButton
                        className='create-routine'
                        buttonText="Modify"
                        onItemClick={ closeMenu }
                        modalComponent={ <RoutineFormModal /> }
                    /> */}</>
            ) }
        </div>
    )
}

export default UserProfile;
