import React from "react";
import path from "./path.svg"
import pencilpaper from "./pencilpaper.svg"

function Step1 ( { routineName, setRoutineName, setTopTopic, setCurrentStep } ) {
    return (
        <div className="start">
            <h2>The New You Starts Here</h2>
            <h3>Give this routine a name, pamper it, buy it some flowers</h3>
            <input
                type="text"
                value={ routineName }
                onChange={ ( e ) => setRoutineName( e.target.value ) }
            />
            <div className={ routineName.length > 35 || routineName.length < 4 ? "char-count-red" : "char-count" }>
                { routineName.length } / 35 characters
            </div>

            <div className="start-button-container">
            <button className="help" type="button" disabled={ !routineName || routineName.length > 35 || routineName.length < 4 } onClick={ () => {
                // makeRoutineId()
                setCurrentStep( 2 )
                } }>
                    <img src={ path }></img>
                    help me build a routine
                    <p>I'd love some suggestions</p>
            </button>
            <button className="go" type="button" disabled={ !routineName || routineName.length > 35 || routineName.length < 4 } onClick={ () => {
                // makeRoutineId()
                setCurrentStep( 5 )
                setTopTopic( 'wellness' )
                } }>
                    <img src={ pencilpaper }></img>
                    start from scratch
                    <p>A blank slate works just fine!</p>
                </button>
            </div>
        </div>
    );
}

export default Step1;
