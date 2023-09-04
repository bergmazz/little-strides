import React from "react";

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

    return (
        <div>
            <p>Choose up to three topics:</p>
            <div className="topics-container">
                { availableTopics.map( ( topic ) => (
                    <label key={ topic } className="topic-tile">
                        <input
                            type="checkbox"
                            value={ topic }
                            checked={ selectedTopics.includes( topic ) }
                            onChange={ () => handleSelectTopics( topic ) }
                        />
                        { topic }
                    </label>
                ) ) }
            </div>
        </div>
    );
}

export default Step2;
