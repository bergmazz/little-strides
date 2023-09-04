import React from "react";

function Step3 ( { selectedTopics, setTopTopic, topTopic } ) {
    return (
        <div>
            <p>Choose Your Focus</p>
            { selectedTopics.map( ( topic ) => (
                <label key={ topic } className="big-topic-tile">
                    <input
                        type="radio"
                        value={ topic.toLowerCase() }
                        checked={ topTopic === topic.toLowerCase() }
                        onChange={ () => setTopTopic( topic.toLowerCase() ) }
                    />
                    { topic }
                </label>
            ) ) }
        </div>
    );
}

export default Step3;
