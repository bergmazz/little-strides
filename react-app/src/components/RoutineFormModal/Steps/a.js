import React from "react";

function Step1 ( { routineName, setRoutineName, setTopTopic, setCurrentStep } ) {
    return (
        <div>
            <p>Set a name for the routine</p>
            <input
                type="text"
                value={ routineName }
                onChange={ ( e ) => setRoutineName( e.target.value ) }
            />
            <div className={ routineName.length > 35 || routineName.length < 4 ? "char-count-red" : "char-count" }>
                { routineName.length } / 35 characters
            </div>
            <button className="help" type="button" disabled={ !routineName || routineName.length > 35 || routineName.length < 4 } onClick={ () => {
                // makeRoutineId()
                setCurrentStep( 2 )
            } }>
                help me build a routine
            </button>
            <button className="go" type="button" disabled={ !routineName || routineName.length > 35 || routineName.length < 4 } onClick={ () => {
                // makeRoutineId()
                setCurrentStep( 5 )
                setTopTopic( 'wellness' )
            } }>
                start from scratch
            </button>
        </div>
    );
}

export default Step1;
