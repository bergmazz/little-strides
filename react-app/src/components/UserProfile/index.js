import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import RoutineFormModal from '../RoutineFormModal';
import RoutineEditForm from '../RoutineEditForm';
import RoutineDeleteForm from '../DeleteRoutine';
import ErrorModal from '../ErrorModal';
import CheckinFormModal from '../CheckInModal'
// import UserRoutines from "./";
// import UserProgress from "./";
import { fetchRoutines } from '../../store/routine';
import waveSvgUp from "./57.svg"
import waveSvg from "./52.svg"
import "./UserProfile.css"


function UserProfile () {
    // console.log( "------ in user profile" );
    const location = useLocation()
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )
    const hasReachedLimit = routines.length >= 3;
    // const habits = useSelector( state => state.habit.user )
    // console.log( "------user:", currentUser );
    const [ showMenu, setShowMenu ] = useState( false );
    const BadgeShapes = [ 'star', 'shield', 'scalloped-circle' ];
    let badgeShapeIndex = 0;

    const ulRef = useRef()
    // const progressSectionRef = useRef();

    useEffect( () => {
        console.log( currentUser )
        dispatch( fetchRoutines() );
        // dispatch( currentUserHabits() )
    }, [ dispatch, currentUser ] );



    const closeMenu = ( e ) => {
        if ( !ulRef.current?.contains( e.target ) ) {
            setShowMenu( false );
        }
    };

    useEffect( () => {
        // console.log( "---------------Inside useEffect" );
        if ( showMenu ) {
            document.addEventListener( "click", closeMenu );
            return () => document.removeEventListener( "click", closeMenu );
        }
    }, [ showMenu ] );

    // console.log( 'Routinesssss:', routines );

    let elem = document.getElementById( location.hash.slice( 1 ) );
    // console.log( "elemmmmmmmmmmmment", elem )
    // If location.hash is not present or element not found
    if ( !elem ) {
        elem = document.documentElement || document.body;
    }

    useEffect( () => {
        elem.scrollIntoView( { behavior: "smooth", offset: -50 } );
    }, [ elem ] );

    if ( !currentUser ) return (
        <div className='no-user'>
            <h1 className='no-user'>.       .        .   .. ....   ....  ..  .....Hold tight for sec.</h1>
            {/* <Link to="/login" className="page-login-link">
                <button className="login-signup-button" type="submit">Login</button>
            </Link> */}
        </div>
    )

    return (
        <div className='userprof'>
            <div className='usersec1'>
                <h1>Hi,  { currentUser.username }!</h1>
                <h3>Real change happens over time. Progress, not perfection. </h3>
            { hasReachedLimit ? (
                <OpenModalButton
                    className="create-routine"
                    buttonText="New Routine"
                    onItemClick={ closeMenu }
                        modalComponent={ <ErrorModal message={ "You already have 3 routines. Wouldn't want you to burn out. Please delete one to create another." } showWarning={ false } /> }
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

                <div className='progress-container' id="progress">
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

            <div className="usersec3" id="routine-section">
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
                                    modalComponent={ <RoutineDeleteForm routine={ routine } showWarning={ false } /> }
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
