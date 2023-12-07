import React from "react";
import pencil from "./pencilonly.svg"
import trash from "./trash.svg"

function Step5 ( { habits, handleSelectedHabits, setEditMe, setHabitDetail, setHabitCat, setCurrentStep } ) {

    return (
        <div>
            <h2>Own Your Habits</h2>
            <h3>Make these your own! Edit to better align with your goals.</h3>
            <div className="habitss">
                <div className="existing">
                { habits.map( ( habit, index ) => {
                    return (
                        <div className="row">
                            <button
                                className="deletebutt"
                                key={ [ index, habit.description ] }
                                onClick={ () => {
                                    handleSelectedHabits( habit )
                                } }
                            >
                                <img src={ trash } alt="delete"></img>
                            </button>
                            <p>{ habit.description }</p>

                            <div className="editbutt">
                                <div className="category">{ habit.category }</div>
                                <button
                                    key={ index }
                                    onClick={ () => {
                                        setEditMe( habit )
                                        setHabitDetail( habit.description );
                                        setHabitCat( habit.category )
                                        setCurrentStep( 6 )
                                    } }
                                >
                                    <img src={ pencil } alt="edit"></img>
                                </button>

                            </div>


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
