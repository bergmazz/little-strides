import React from "react";
import pencil from "./pencilonly.svg"
import trash from "./trash.svg"

function Step5 ( { habits, handleSelectedHabits, setEditMe, setHabitDetail, setHabitCat, setCurrentStep } ) {

    return (
        <div>
            <h1>Own Your Habits</h1>
            <div className="habitss">
                <div className="existing">
                { habits.map( ( habit, index ) => {
                    return (
                        <div className="row">
                            <p>{ habit.description }</p>
                            <div className="editdeletebutt">
                                <button
                                    key={ index }
                                    onClick={ () => {
                                        setEditMe( habit )
                                        setHabitDetail( habit.description );
                                        setHabitCat( habit.category )
                                        setCurrentStep( 6 )
                                    } }
                                > edit
                                </button>
                            <button
                                key={ [ index, habit.description ] }
                                onClick={ () => {
                                    handleSelectedHabits( habit )
                                } }
                                > delete
                            </button>
                            </div>
                            {/* <div className="edit"
                                onClick={ () => {
                                    setEditMe( habit )
                                    setHabitDetail( habit.description );
                                    setHabitCat( habit.category )
                                    setCurrentStep( 6 )
                                } }>
                                <image
                                    key={ index }
                                    src={ pencil }
                                    alt="pencil"
                                />
                            </div>
                            <div
                                clasName="delete-habit"
                                key={ [ index, habit.description ] }
                                onClick={ () => {
                                    handleSelectedHabits( habit )
                                } }
                            >
                                <image
                                    src={ trash }
                                    alt="trash"
                                />
                            </div> */}


                        </div>
                    );
                } ) }</div>
            </div>
            <button
                className="newhabit"
                onClick={ () => {
                    setHabitCat( "" )
                    setHabitDetail( "" )
                    setCurrentStep( 7 )
                } }
            >
                write new habit
            </button>
        </div>
    );
}

export default Step5;
