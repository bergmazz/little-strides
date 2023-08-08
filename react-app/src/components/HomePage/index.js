import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import waveSvg from "./52.svg"
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();

    return (
        <div className="homepage-container">
            <div className="slogan">
                <h1>We form habits, </h1>
                <h1>then our habits form us.</h1>
                <h4>Commit to a routine, check in daily, and watch your life change. </h4>
            </div>
            <div className="wave-1">
                <img src={ waveSvg } alt="Wave" />
            </div>
        </div>
    )
}

export default HomePage
