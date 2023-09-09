import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
import RoutineDeleteForm from '../DeleteRoutine';
import ErrorModal from '../ErrorModal';
import CheckinFormModal from '../CheckInModal'
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
        console.log( currentUser )
        dispatch( fetchRoutines() );
        // dispatch( currentUserHabits() )
    }, [ dispatch, currentUser ] );

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
            <h1 className='no-user'>.              .....how did you get here? Hold tight for sec.</h1>
            {/* <Link to="/login" className="page-login-link">
                <button className="login-signup-button" type="submit">Login</button>
            </Link> */}
        </div>
    )

    return (
        <div className='userprof'>
            <div className='usersec1'>
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
            </div>

            <div className="wave-2">
                <img src={ waveSvgUp } alt="Wave" />
            </div>
            <div className='usersec2'>
                { routines && routines.length > 0 ? (
                    <h1>Manage your routines</h1>
                ) : (
                    <h1>Get started, create a routine.</h1>
                ) }
            { routines ? (
                    routines.map( ( routine ) => (

                        <div className="routine-section" key={ routine.id }>
                            <div className="routine-tile">
                                <div className="routine-img">
                                    <img alt={ routine.name } src={ routine.coverImage } />
                                    <h1>{ routine.name }</h1>
                                </div>
                                <div className="habittext">
                        { routine.habits.map( ( habit ) => (
                            <div key={ habit.id }>
                                <div className='bubble'>
                                    <p>{ habit.description }</p>
                                </div>
                                {/* <p>  { habit.percent } % yes </p>
                                <p> { habit.streak } days in a row</p>
                                 <p>  { habit.category } </p> */}
                            </div>
                        ) ) }
                                </div>
                            </div>
                            <div className="routine-buttons">
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
                                    onItemClick={ closeMenu }
                                    modalComponent={ <CheckinFormModal habits={ routine.habits } showWarning={ false } /> }
                                    // modalComponent={ <ErrorModal message={ "Coming soon." } showWarning={ false } /> }
                                />
                            </div>
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
        </div>
    )
}

export default UserProfile;
