import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import waveSvg from "./52.svg"
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();

    return (
        <div className="homepage-container">
            <div className="wave-1">
                <img src={ waveSvg } alt="Wave" />
            </div>
        </div>
    )
}

export default HomePage
