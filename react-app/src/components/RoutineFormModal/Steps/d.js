import React from "react";

function Step4 ( { suggested, habits, handleSelectedHabits } ) {

    return (
        <div className="suggested-container">
            <h1>Suggested Habits</h1>
            <div className="suggested">
                { suggested.map( ( habit, index ) => {
                    const [ habitText, habitTopic ] = habit.split( " !#*SPLIT " );
                    return (
                        <div>
                            <button
                                className={ `suggested-habit-button ${ habits.some( ( h ) => h.description === habitText ) ? "selected" : "" }` }
                                key={ index }
                                onClick={ () => {
                                    let habit = { "category": habitTopic, "description": habitText }
                                    handleSelectedHabits( habit );
                                } }
                            >
                                { habitText }
                            </button>
                        </div>
                    );
                } ) }
            </div>
        </div>
    );
}

export default Step4;
