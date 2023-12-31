import React from "react";
import { anxiety, relationships, exercise, wellness, stress, sleep, depression, productivity } from "../Topics";

function Step2 ( { availableTopics, selectedTopics, setSelectedTopics } ) {

    const handleSelectTopics = ( selectedTopic ) => {
        if ( selectedTopics.includes( selectedTopic ) ) {
            setSelectedTopics( selectedTopics.filter( ( topic ) => topic !== selectedTopic ) )
        } else {
            if ( selectedTopics.length < 3 ) {
                setSelectedTopics( [
                    ...selectedTopics,
                    selectedTopic,
                ] );
            }
        }
    };

    const topicImages = {
        anxiety: anxiety,
        relationships: relationships,
        exercise: exercise,
        wellness: wellness,
        stress: stress,
        sleep: sleep,
        depression: depression,
        productivity: productivity,
    };
    return (
        <div className="all-topics">
            <h2>What would you like to work on?</h2>
            <h3>Choose up to three topics:</h3>
            <div className="topics-container">
                { availableTopics.map( ( topic ) => (
                    <button
                        key={ topic }
                        className={ `topic-button ${ selectedTopics.includes( topic ) ? "selected" : "" }` }
                        onClick={ () => handleSelectTopics( topic ) }
                    >
                        <img
                            src={ topicImages[ topic.toLowerCase() ] }
                            alt={ topic }
                        />
                    </button>
                ) ) }
            </div>
        </div>
    );
}

export default Step2;
