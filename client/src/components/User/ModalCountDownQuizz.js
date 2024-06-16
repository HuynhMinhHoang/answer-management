import React, { useRef } from "react";
import "./ModalCountDownQuizz.scss";
import CountDownTime from "./CountDownTime";

const ModalCountDownQuizz = (props) => {
  const refDiv = useRef([]);
  const { dataQuizz, handleFinish, setCurrentQuestion } = props;

  // console.log("dataQuizz", dataQuizz);

  const getClassQuestion = (question) => {
    if (question && question.answer && question.answer.length > 0) {
      let isAnswer = question.answer.find((a) => a.isSelected === true);
      if (isAnswer) {
        return "number selected";
      }
    }
    return "number";
  };

  const handleClickQuestion = (question, index) => {
    setCurrentQuestion(index);

    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "number clicked") {
          item.className = "number";
        }
      });
    }

    if (question && question.answer && question.answer.length > 0) {
      let isAnswer = question.answer.find((a) => a.isSelected === true);
      if (isAnswer) {
        return;
      }
    }
    refDiv.current[index].className = "number clicked";
  };
  return (
    <div className="countdown-container">
      <CountDownTime handleFinish={handleFinish} />

      <div className="bg-number">
        {dataQuizz &&
          dataQuizz.length > 0 &&
          dataQuizz.map((item, index) => {
            return (
              <div
                key={index}
                className={getClassQuestion(item)}
                onClick={() => {
                  handleClickQuestion(item, index);
                }}
                ref={(el) => (refDiv.current[index] = el)}
              >
                <span>{index + 1}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ModalCountDownQuizz;
