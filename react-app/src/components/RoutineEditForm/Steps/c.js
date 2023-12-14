import React from "react";
import { anxiety, relationships, exercise, wellness, stress, sleep, depression, productivity } from "../../RoutineFormModal/Topics";

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
            <h2>Did your focus change?</h2>
            <h3>Well, for this routine at least</h3>
            <div className="bigtopic-tiles">
                { selectedTopics.map( ( topic ) => (
                    <button
                        key={ topic.toLowerCase() }
                        // value={ topic.toLowerCase() }
                        className={ `big-topic-button ${ topTopic === topic.toLowerCase() ? "selected" : "" }` }
                        onClick={ ( e ) => {
                            setTopTopic( topic.toLowerCase() )
                        } }
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

export default Step3;
