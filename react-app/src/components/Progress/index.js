import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
// import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
import RoutineDeleteForm from '../DeleteRoutine';
import ErrorModal from '../ErrorModal';
import CheckinFormModal from '../CheckInModal'
// import UserRoutines from "./";
// import UserProgress from "./";
import { fetchRoutines } from '../../store/routine';
// import { currentUserHabits } from '../../store/habit';
import waveSvgUpp from "./54.svg"
import "./Progress.css"


function Progress () {
    // console.log( "------ in user profile" );
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
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
        if ( currentUser ) {
            dispatch( fetchRoutines() );
        }
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
            <h1 className='no-user'>Sorry, you need to log in</h1>
            {/* <Link to="/login" className="page-login-link">
                <button className="login-signup-button" type="submit">Login</button>
            </Link> */}
        </div>
    )
    // const isAlreadyCheckedIn = routines.some( ( routine ) => routine.checkedIn );


    return (
        <div className='userprof'>
            <div className='usersec1'>
                {/* <h1>***FEATURE IN PROGRESS!***</h1> */ }
                <h1>Making some strides!</h1>
                {/* <h4>Here's a breakdown of "yes" repsonses by routines</h4> */ }
                <div>
                    { routines.map( ( routine ) => (
                        <div className="routine-section" key={ routine.id }>
                            {/* <div className="routine-tile"> */ }
                            <div >
                                    <h1>{ routine.name }</h1>
                                <h4>You completed { routine.averagePastWeek }% of habits in this routine checking in last week</h4>
                                <h4>Your all time track record for this routine is at { routine.averageCompletionAllTime }% </h4>

                            </div>
                        </div>
                    ) ) }
                </div>
            </div>

            <div className="wave-2">
                <img src={ waveSvgUpp } alt="Wave" />
            </div>
            <div className='usersec2'>
                { routines && routines.length > 0 ? (
                    <h1>Pogress per habit</h1>
                ) : (
                    <h1>Get started, create a routine.</h1>
                ) }
                { routines && routines.length > 0 ? (
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
                                            {/* <div className='bubble'> */ }
                                            <h3> - { habit.description }</h3>
                                            {/* </div> */ }
                                            <p>  { habit.percent } % yes all time</p>
                                            <p> You've completed this habit { habit.streak } checkins in a row</p>
                                            <p>  This habit is working on your { habit.category } </p>
                                        </div>
                                    ) ) }
                                </div>
                            </div>
                            <div className="routine-buttons">

                                <OpenModalButton
                                    className='checkin'
                                    buttonText="Check In"
                                    onItemClick={ closeMenu }
                                    // modalComponent={ <ErrorModal message={ "Coming soon." } showWarning={ false } /> }
                                    modalComponent={ <CheckinFormModal habits={ routine.habits } showWarning={ false } /> }
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

export default Progress;
