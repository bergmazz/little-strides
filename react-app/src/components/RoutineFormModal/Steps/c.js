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
            <h1>Choose Your Focus:</h1>
            { selectedTopics.map( ( topic ) => (
                // <button
                //     key={ topic }
                //     value={ topic.toLowerCase() }
                //     className={ `big-topic-button ${ topTopic === topic ? "selected" : "" }` }
                //     onClick={ () => setTopTopic( topic.toLowerCase() ) }
                // >
                //     <img
                //         src={ topicImages[ topic.toLowerCase() ] }
                //         alt={ topic }
                //     />
                // </button>
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
