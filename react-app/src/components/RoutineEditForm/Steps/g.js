import React, { useState } from "react";

function Step7 ( { habitDetail, setHabitDetail, habitCat, setHabitCat, availableTopics, setCurrentStep, handleSelectedHabits, confetti, setConfetti } ) {
    const [ isDropdownOpen, setDropdownOpen ] = useState( false );

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

            <h3>If you had to categorize it (you do), what does this help with?</h3>
            <div className="custom-dropdown">
                <div
                    className={ `selected-option ${ isDropdownOpen ? "open" : "" }` }
                    onClick={ () => setDropdownOpen( !isDropdownOpen ) }
                >
                    { habitCat ? habitCat : "Select a category" }
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
                disabled={ !habitCat || !habitDetail || habitDetail.length > 75 }
                onClick={ () => {
                    handleSelectedHabits( { "category": habitCat, "description": habitDetail } )
                    setConfetti( true );
                    setTimeout( () => {
                        setCurrentStep( 5 );
                        setConfetti( false );
                    }, 2000 );
                } }>
                Commit!
                {/* { confetti && (
                    <div className="confetti-container">
                        { Array.from( { length: 50 } ).map( ( _, index ) => (
                            <div
                                key={ index }
                                className="confetti"
                            />
                        ) ) }
                    </div>
                ) } */}
            </button>


        </div>
    );
}

export default Step7;
