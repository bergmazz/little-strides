import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
import RoutineDeleteForm from '../DeleteRoutine';
import ErrorModal from '../ErrorModal';
// import UserRoutines from "./";
// import UserProgress from "./";
import { fetchRoutines } from '../../store/routine';
// import { currentUserHabits } from '../../store/habit';
import waveSvgUp from "./57.svg"
import "./UserProfile.css"


function UserProfile () {
    // console.log( "------ in user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
    const hasReachedLimit = routines.length >= 3;
    // const habits = useSelector( state => state.habit.user )
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
        // dispatch( currentUserHabits() )
    }, [ dispatch ] );

    useEffect( () => {
        // console.log( "---------------Inside useEffect" );
        if ( showMenu ) {
            document.addEventListener( "click", closeMenu );
            return () => document.removeEventListener( "click", closeMenu );
        }
    }, [ showMenu ] );

    // console.log( 'Routinesssss:', routines );

    if ( !currentUser ) return (
        <div className='no-user'>
            <h1 className='no-user'>Sorry, you need to log in</h1>
            {/* <Link to="/login" className="page-login-link">
                <button className="login-signup-button" type="submit">Login</button>
            </Link> */}
        </div>
    )

    return (
        <div className='userprof'>
            <h1>{ "Hi,  " }{ currentUser.username }{ "!" }</h1>
            { hasReachedLimit ? (
                <OpenModalButton
                    className="create-routine"
                    buttonText="New Routine"
                    onItemClick={ closeMenu }
                    modalComponent={ <ErrorModal message={ "You already have 3 routines. Please delete one to create another." } showWarning={ false } /> }
                />
            ) : (
                    <OpenModalButton
                        className="create-routine"
                        buttonText="New Routine"
                        onItemClick={ closeMenu }
                        modalComponent={ <RoutineFormModal routines={ routines } showWarning={ true } /> }
                    />
            ) }

            <div className="wave-2">
                <img src={ waveSvgUp } alt="Wave" />
            </div>

            <h1>Mange your routines</h1>
            { routines ? (
                routines.map( ( routine ) => (
                    <div className="routine-tile" key={ routine.id }>
                        <img className="routine-img" alt={ routine.name } src={ routine.coverImage } />
                        <h3>{ routine.name }</h3>
                        { routine.habits.map( ( habit ) => (
                            <div key={ habit.id }>
                                <div className='habit-bubble'>
                                    { habit.description }
                                </div>
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
                            modalComponent={ <RoutineDeleteForm routineId={ routine.id } showWarning={ false } /> }
                        />
                        <OpenModalButton
                            className='checkin'
                            buttonText="Check In"
                            modalComponent={ <RoutineDeleteForm routineId={ routine.id } showWarning={ false } /> }
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
