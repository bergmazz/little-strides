import React from "react";

function Step6 ( { editMe, habitDetail, setHabitDetail, habitCat, setHabitCat, availableTopics, setCurrentStep, habits, setHabits } ) {

    const handleEditHabits = ( habit, prevHabit = habit ) => {
        const { description, category } = habit;
        if ( habits.some( ( h ) => h.description === description ) ) {
            setHabits( ( habits ) => habits.filter( ( h ) => h.description !== habit.description ) );
        } if ( habit !== prevHabit ) {
            const existingHabitIndex = habits.findIndex( ( h ) => h.description === prevHabit.description );
            if ( existingHabitIndex !== -1 ) {
                const updatedHabits = [ ...habits ];
                updatedHabits[ existingHabitIndex ] = { description, category };
                setHabits( updatedHabits );
            }
        }
    };

    return (
        <div className="write-edit-habit">
            <h2>Your Habit</h2>
            <h3>Make it say something about who you want to be.</h3>
            <textarea
                value={ habitDetail }
                onChange={ ( e ) =>
                    setHabitDetail( e.target.value ) }
            />
            <select
                value={ habitCat.toLowerCase() }
                onChange={ ( e ) => setHabitCat( e.target.value ) }
            >
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
                    const habit = { "category": habitCat, "description": habitDetail }
                    handleEditHabits( habit, editMe )
                    //some sool confetti or something animated when you commit
                    setCurrentStep( 5 )
                } }>
                Commit!
            </button>
        </div>
    );
}

export default Step6;
