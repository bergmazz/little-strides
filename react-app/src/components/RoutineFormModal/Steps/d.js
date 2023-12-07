import React from "react";

function Step4 ( { selectedTopics, suggested, habits, handleSelectedHabits } ) {
    const generateHeaderText = () => {
        if ( selectedTopics.length === 1 ) {
            return `For ${ selectedTopics[ 0 ] }`;
        } else if ( selectedTopics.length === 2 ) {
            return `For ${ selectedTopics.join( " and " ) }`;
        } else if ( selectedTopics.length === 3 ) {
            return `For ${ selectedTopics.slice( 0, -1 ).join( ", " ) }, and ${ selectedTopics.slice( -1 ) }`;
        } else {
            return "For Selected Topics";
        }
    };

    return (
        <div className="suggested-container">
            <h2>{ generateHeaderText() }</h2>
            <h3>Add suggested habits to your routine or move on to write your own</h3>
            <div className="suggested">
                { suggested.map( ( habit, index ) => {
                    const [ habitText, habitTopic ] = habit.split( " !#*SPLIT " );
                    return (

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

                    );
                } ) }
            </div>
        </div>
    );
}

export default Step4;
