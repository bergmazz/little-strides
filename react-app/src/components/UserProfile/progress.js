import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ErrorModal from '../ErrorModal';
import CheckinFormModal from '../CheckInModal'
import { fetchRoutines } from '../../store/routine';

function UserProgress () {

    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.session.user )
    const routines = useSelector( state => state.routine.routines )

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
    }, [ dispatch, currentUser ] );

    useEffect( () => {
        // console.log( "---------------Inside showmenu useEffect" );
        if ( showMenu ) {
            document.addEventListener( "click", closeMenu );
            return () => document.removeEventListener( "click", closeMenu );
        }
    }, [ showMenu ] );
    // console.log( '-----Routinesssss:', routines );

    return (
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
    )

}

export default UserProgress;
