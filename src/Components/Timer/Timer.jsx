import React, { useState, useEffect } from "react";

import "./Timer.css"

const Timer = ({ targetDate }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function calculateTimeRemaining() {
        const difference = new Date(targetDate) - new Date();
        if (difference < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
    }

    return (
        <div className="time">
            <div className="timer-item">
                <span className="timer-item__title">Days</span>
                <span className="timer-item__time">{timeRemaining.days}</span>
            </div>
            <div className="timer-item">
                <span className="timer-item__title">Hour</span>
                <span className="timer-item__time">{timeRemaining.hours}</span>
            </div>
            <div className="timer-item">
                <span className="timer-item__title">Min</span>
                <span className="timer-item__time"> {timeRemaining.minutes}</span>
            </div>
            <div className="timer-item">
                <span className="timer-item__title">Sec</span>
                <span className="timer-item__time">{timeRemaining.seconds}</span>
            </div>
        </div>
        
    );
};

export default Timer;
