import React, { useEffect, useState } from "react";

const CountDownTime = (props) => {
  const [count, setCount] = useState(30000);
  const [isBlinking, setIsBlinking] = useState(false);

  const { handleFinish } = props;
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  useEffect(() => {
    if (count === 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 10) {
      setIsBlinking(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div className={`time ${isBlinking ? "blink-red" : ""}`}>
      {toHHMMSS(count)}
    </div>
  );
};

export default CountDownTime;
