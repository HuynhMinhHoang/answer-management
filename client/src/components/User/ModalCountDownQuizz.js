import React from "react";
import "./ModalCountDownQuizz.scss";

const ModalCountDownQuizz = (props) => {
  const { dataQuizz } = props;
  console.log("dataQuizz", dataQuizz);
  return (
    <div className="countdown-container">
      <div className="time">15:00:00</div>

      <div className="bg-number">
        {dataQuizz &&
          dataQuizz.length > 0 &&
          dataQuizz.map((item, index) => {
            return (
              <div className="number">
                <span>{index + 1}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ModalCountDownQuizz;
