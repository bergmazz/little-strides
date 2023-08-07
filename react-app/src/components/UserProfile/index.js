import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
import RoutineDeleteForm from '../DeleteRoutine';
// import UserRoutines from "./";
// import UserProgress from "./";
import { fetchRoutines, createRoutine, editRoutine } from '../../store/routine';
import { currentUserHabits } from '../../store/habit';
import "./UserProfile.css"


function UserProfile () {
    // console.log( "------ in user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
    const habits = useSelector( state => state.habit.user )
    // console.log( "------user:", currentUser );
    const [ showMenu, setShowMenu ] = useState( false );

    const ulRef = useRef()

    const closeMenu = ( e ) => {
        if ( !ulRef.current?.contains( e.target ) ) {
            setShowMenu( false );
        }
    };

    useEffect( () => {
        dispatch( fetchRoutines() );
        dispatch( currentUserHabits() )
    }, [ dispatch ] );

    useEffect( () => {
        // console.log( "---------------Inside useEffect" );
        if ( showMenu ) {
            const closeMenu = ( e ) => {
                if ( !ulRef.current.contains( e.target ) ) {
                    setShowMenu( false );
                }
            };
            document.addEventListener( "click", closeMenu );
            return () => document.removeEventListener( "click", closeMenu );
        }
    }, [ showMenu ] );

    // console.log( 'Routinesssss:', routines );

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
                onItemClick={ closeMenu }
                modalComponent={ <RoutineFormModal routines={ routines } showWarning={ true } /> }
            />

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
                            modalComponent={ <RoutineEditForm existingRoutine={ routine } showWarning={ true } /> }
                        />
                        <OpenModalButton
                        className='kill-routine'
                        buttonText="Delete"
                            modalComponent={ <RoutineDeleteForm routineId={ routine.id } /> }
                        />
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
