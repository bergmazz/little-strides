import React, { useState } from "react";

function Step6 ( { editMe, habitDetail, setHabitDetail, habitCat, setHabitCat, availableTopics, setCurrentStep, habits, setHabits, habitsToEdit, setHabitsToEdit } ) {

    const [ isDropdownOpen, setDropdownOpen ] = useState( false );

    const handleEditHabits = ( habit, prevHabit = habit ) => {
        const { id, description, category } = habit;

        if ( id ) {
            setHabitsToEdit( ( habitsToEdit ) => [ ...habitsToEdit, habit ] );
        }

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
            <h3>In a few words, say something about who you want to be.</h3>
            <textarea
                value={ habitDetail }
                onChange={ ( e ) =>
                    setHabitDetail( e.target.value ) }
            />
            <div className={ habitDetail.length > 100 || habitDetail.length < 3 ? "silly char-count-red" : "silly char-count" }>
                { habitDetail.length } / 100 characters
            </div>
            <h3 >If you had to categorize it (you do), what does this help with?</h3>
            <div className="custom-dropdown">
                <div
                    className={ `selected-option ${ isDropdownOpen ? 'open' : '' }` }
                    onClick={ () => setDropdownOpen( !isDropdownOpen ) }
                >
                    { habitCat || 'Select an option' }
                </div>
                { isDropdownOpen && (
                    <div className="options">
                        { availableTopics.map( ( topic ) => (
                            <div
                                key={ topic.toLowerCase() }
                                onClick={ () => {
                                    setHabitCat( topic.toLowerCase() );
                                    setDropdownOpen( false );
                                } }
                            >
                                { topic.toLowerCase() }
                            </div>
                        ) ) }
                    </div>
                ) }
            </div>


            <button
                className="commit"
                disabled={ !habitCat || !habitDetail || habitDetail.length > 100 }
                onClick={ () => {
                    let habit;
                    if ( editMe.id ) {
                        setHabitsToEdit( [ ...habitsToEdit, habit ] )
                        habit = { "category": habitCat, "description": habitDetail, "id": editMe.id }
                    } else {
                        habit = { "category": habitCat, "description": habitDetail }
                    }
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
