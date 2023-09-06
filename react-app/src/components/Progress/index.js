import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
// import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
import RoutineDeleteForm from '../DeleteRoutine';
import ErrorModal from '../ErrorModal';
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
            <h1 className='no-user'>Sorry, you need to log in</h1>
            {/* <Link to="/login" className="page-login-link">
                <button className="login-signup-button" type="submit">Login</button>
            </Link> */}
        </div>
    )

    return (
        <div className='userprof'>
            <div className='usersec1'>
                <h1>***FEATURE IN PROGRESS!***</h1>
                <h1>Making some strides!</h1>
                <h4>Here's a breakdown of "yes" repsonses by routines</h4>
                <div>
                    { routines.map( ( routine ) => (
                        <div className="routine-section" key={ routine.id }>
                            {/* <div className="routine-tile"> */ }
                            <div >
                                    <h1>{ routine.name }</h1>
                                <h4>You completed { routine.averagePastWeek }% of habits checking in last week</h4>
                                <h4>Your all time track record for this routine is at { routine.averageCompletionAllTime }% right now</h4>

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
                                            <div className='bubble'>
                                                <p>{ habit.description }</p>
                                            </div>
                                            <p>  { habit.percent } % yes </p>
                                <p> { habit.streak } days in a row</p>
                                            <p>  { habit.category } </p>
                                        </div>
                                    ) ) }
                                </div>
                            </div>
                            <div className="routine-buttons">

                                <OpenModalButton
                                    className='checkin'
                                    buttonText="Check In"
                                    onItemClick={ closeMenu }
                                    modalComponent={ <ErrorModal message={ "Coming soon." } showWarning={ false } /> }
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
