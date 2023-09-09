import React from "react";
import { anxiety, relationships, exercise, wellness, stress, sleep, depression, productivity } from "../Topics";

function Step3 ( { selectedTopics, setTopTopic, topTopic } ) {

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
        <div className="top-topic-container">
            <p>Choose Your Focus</p>
            { selectedTopics.map( ( topic ) => (
                <button
                    key={ topic }
                    value={ topic.toLowerCase() }
                    className={ `big-topic-button ${ topTopic === topic ? "selected" : "" }` }
                    onClick={ () => setTopTopic( topic.toLowerCase() ) }
                >
                    <img
                        src={ topicImages[ topic.toLowerCase() ] }
                        alt={ topic }
                    />
                </button>
            ) ) }
        </div>
    );
}

export default Step3;
