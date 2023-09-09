import React from "react";

function Step7 ( { habitDetail, setHabitDetail, habitCat, setHabitCat, availableTopics, setCurrentStep, handleSelectedHabits } ) {
    return (
        <div>
            <h1>Create a Habit</h1>
            <input
                type="text"
                value={ habitDetail }
                onChange={ ( e ) =>
                    setHabitDetail( e.target.value ) }
            />
            <select
                value={ habitCat }
                onChange={ ( e ) => setHabitCat( e.target.value ) }
            >
                <option value="">Select a category</option>
                { availableTopics.map( ( topic ) => (
                    <option key={ topic } value={ topic.toLowerCase() }>
                        { topic }
                    </option>
                ) ) }
            </select>
            <div className={ habitDetail.length > 75 ? "char-count-red" : "char-count" }>
                { habitDetail.length } / 75 characters
            </div>
            <button
                disabled={ !habitCat || !habitDetail || habitDetail.length > 75 }
                onClick={ () => {
                    handleSelectedHabits( { "category": habitCat, "description": habitDetail } )
                    //some sool confetti or something animated when you commit
                    // setHabitCat( "" )
                    // setHabitDetail( "" )
                    setCurrentStep( 5 )
                } }>
                Commit!
            </button>
        </div>
    );
}

export default Step7;
