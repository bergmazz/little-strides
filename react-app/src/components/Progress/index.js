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
import waveSvg from "./52.svg"
// import waveSvg from "./56.svg"
// import waveSvg from "./wave.svg"
// import waveSvg from "./wav2.svg"
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
    const BadgeShapes = [ 'star', 'shield', 'scalloped-circle' ];
    let badgeShapeIndex = 0;

    return (
        <div className='userprof'>
            <div className='usersecc1'>
                {/* <h1>Progress, not perfection</h1> */ }
                <h1>Real change happens over time. Progress, not perfection </h1>
            </div >

            <div className="wave-2">
                <img src={ waveSvgUpp } alt="Wave" />
            </div>
            <div className='usersec2'>
                {/* { routines && routines.length > 0 ? (
                    <h2>Making some strides!</h2>
                ) : (
                        <h2>Get started, create a routine.</h2>
                ) } */}
                <div className='progress-container'>
                    { routines.map( ( routine ) => (
                        <div className="routine-progress" key={ routine.id }>
                            {/* <div className="routine-tile"> */ }
                            <div className='progress'>
                                <h1>{ routine.name }</h1>

                                <h1 className='bigg' > { routine.averageCompletionAllTime }% yes all time </h1>
                                <h2>Making some strides!</h2>
                                <div className="habitbadges">
                                    { routine.habits.map( ( habit ) => {
                                        const shouldDisplayBadge = habit.streak > 1;
                                        const badgeShape = shouldDisplayBadge ? BadgeShapes[ badgeShapeIndex ] : '';
                                        badgeShapeIndex = ( badgeShapeIndex + 1 ) % BadgeShapes.length;
                                        return (
                                            <div key={ habit.id } className={ `habit ${ badgeShape }` }>
                                                { shouldDisplayBadge && (
                                                    <div className={ `streak-badge ${ badgeShape }` }>
                                                        { badgeShape === 'star' && (
                                                            <span className="fa-stack">
                                                                <i className="fas fa-star fa-stack-2x"></i>
                                                                <i className="fas fa-stack-1x streak-number">{ habit.streak }</i>
                                                            </span>
                                                        ) }
                                                        { badgeShape === 'shield' && (
                                                            <span className="fa-stack">
                                                                <i className="fas fa-heart fa-stack-2x"></i>
                                                                <i className="fas fa-stack-1x streak-number">{ habit.streak }</i>
                                                            </span>
                                                        ) }
                                                        { badgeShape === 'scalloped-circle' && (
                                                            <span className="fa-stack">
                                                                <i className="fas fa-certificate fa-stack-2x"></i>
                                                                <i className="fas fa-stack-1x streak-number">{ habit.streak }</i>
                                                            </span>
                                                        ) }
                                                    </div>
                                                ) }
                                            </div>
                                        );
                                    } ) }
                                </div>
                                <h1 className='biggish'>{ routine.averageToday }% for today's habits</h1>
                                <h4>{ routine.averagePastWeek }% average in the past week</h4>

                                <div className="habit-descriptions">
                                    { routine.habits.map( ( habit ) => {
                                        return (
                                            <div key={ habit.id }>
                                                { habit.streak > 1 && (
                                                    <p>
                                                        <i className="fas fa-fire"></i>
                                                        { ` ${ habit.description } ${ habit.streak } check ins in a row` }
                                                    </p>
                                                ) }
                                            </div>
                                        );
                                    } ) }
                                </div>

                            </div >
                        </div >
                    ) )
                    }
                </div>

            </div>

            <div className="wave-2">
                <img src={ waveSvg } alt="Wave" />
            </div>

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

                                { routine.averageToday > 0 ? (
                                    // <OpenModalButton
                                    //     className='checkin'
                                    //     buttonText="Check In"
                                    //     onItemClick={ closeMenu }
                                    //     // modalComponent={ <ErrorModal message={ "Coming soon." } showWarning={ false } /> }
                                    //     modalComponent={ <CheckinFormModal habits={ routine.habits } showWarning={ false } /> }
                                    // />
                                    <OpenModalButton
                                        className="create-routine"
                                        buttonText="Check In"
                                        onItemClick={ closeMenu }
                                        modalComponent={ <ErrorModal message={ "You already checked in today!" } showWarning={ false } /> }
                                    />

                                ) : (
                                        <OpenModalButton
                                        className="checkin"
                                        buttonText="Check In"
                                        onItemClick={ closeMenu }
                                        modalComponent={ <CheckinFormModal habits={ routine.habits } showWarning={ false } /> }
                                    />
                                ) }


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
    )
}

export default Progress;
