import React, { Component } from 'react'

const TimeClock = ({currentHour, currentMinutes, currentSeconds, counter})=> {
return(
    <>
    {!counter && <div className="time-clock-wrapper">
        <span className="timer-clock">{`${currentHour}:${currentMinutes}:${currentSeconds}`}</span>
    </div>}

    {counter && <div className="time-clock-counter-wrapper">
        <span className="timer-clock-counter">{`${currentHour}:${currentMinutes}:${currentSeconds}`}</span>
    </div>}
    </>
)
}

export default TimeClock;