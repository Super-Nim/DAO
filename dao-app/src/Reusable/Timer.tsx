import { clear } from "console";
import React, { useEffect, useRef, useState } from "react";
import "../scss/Timer.scss";

type TimerInputProps = {
  futureDate: number;
  blockTimestamp: number;
  daoTimer?: string;
};

//TODO: need to pass block.timestamp from contract's deployed block, pass here as props, set as startTime
const Timer = ({ futureDate, blockTimestamp, daoTimer }: TimerInputProps) => {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  // TODO: specify useRef typing, might fix leakage
  let interval = useRef() as any;

  const startTimer = () => {
    const tomorrow = new Date("April 19, 2022 17:58:00").getTime();

    interval = setInterval(() => {
      const startDate = blockTimestamp;

      const difference = futureDate - startDate;
      console.log('difference: ', difference);
      console.log('futureDate: ', futureDate);
      console.log('blockTimestamp: ', blockTimestamp);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString();
      console.log('days: ', days);
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ).toString();
      const minutes = "00";
      // const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString();

      if (difference < 0) {
        clearInterval(interval.current);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
      }
    }, 1000);
  };

  // TODO: fix memory leakage, on unmount
  // useEffect(() => {
  //   startTimer();
  //   let intervalCurrent = interval.current as any;
  //   return () => {
  //     console.log('clear');
  //     clearInterval(intervalCurrent);
  //   };
  // }, []);

  return (
    <section className="container">
      <section className="timer">
        <div>
          <span className="mdi mdi-calendar-clock timer-icon"></span>
          <h2>Time Remaining</h2>
        </div>
        <div>
          <section>
            <p>{days}</p>
            <p>days</p>
          </section>
          <span>:</span>
          <section>
            <p>{hours}</p>
            <p>hours</p>
          </section>
          <span>:</span>
          <section>
            <p>{minutes}</p>
            <p>minutes</p>
          </section>
        </div>
      </section>
    </section>
  );
};

export default Timer;
