import React from "react";

function Step5 ( { habits, handleSelectedHabits, setEditMe, setHabitDetail, setHabitCat, setCurrentStep } ) {

    return (
        <div>
            <p>Own Your Habits</p>
            <div className="habitss">
                { habits.map( ( habit, index ) => {
                    return (
                        <div className="row">
                            <p>{ habit.description }</p>
                            <button
                                key={ [ index, habit.description ] }
                                onClick={ () => {
                                    handleSelectedHabits( habit )
                                } }
                            > trash can
                            </button>
                            <button
                                key={ index }
                                onClick={ () => {
                                    setEditMe( habit )
                                    setHabitDetail( habit.description );
                                    setHabitCat( habit.category )
                                    setCurrentStep( 6 )
                                } }
                            > pencil icon
                            </button>
                        </div>
                    );
                } ) }
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
