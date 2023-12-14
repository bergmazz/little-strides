import React from "react";
import path from "./path.svg"
import pencilpaper from "./pencilpaper.svg"

function Step1 ( { routineName, setRoutineName, setTopTopic, setCurrentStep } ) {
    return (
        <div className="start">
            <h2 className="newyou">The New You Starts Here</h2>
            <h3>Rename your routine, if this one doesn't seem to fit</h3>
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
                    setCurrentStep( 2 )
                } }>
                    <img src={ path }></img>
                    <h5>help spruce up my routine</h5>
                    <p>I'd love some suggestions</p>
                </button>
                <button className="go" type="button" disabled={ !routineName || routineName.length > 35 || routineName.length < 4 } onClick={ () => {
                    setCurrentStep( 5 )
                    setTopTopic( 'wellness' )
                } }>
                    <img src={ pencilpaper }></img>
                    <h5>write and edit habits</h5>
                    <p>I know what I'm doing!</p>
                </button>
            </div>
        </div >
    );
}

export default Step1;
