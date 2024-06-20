import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";

const Question = ({
  currentQuestion,
  data,
  handleCheckFromParent,
  isShowAnswer,
}) => {
  const { t } = useTranslation();

  const handleCheckInput = (e, answerId, questionId) => {
    handleCheckFromParent(answerId, questionId);
  };

  return (
    <>
      {data.image ? (
        <div className="bg-img">
          <img src={`data:image/jpeg;base64,${data.image}`} alt="img" />
        </div>
      ) : (
        <div className="bg-img">{t("question.noImg")}</div>
      )}
      <h5>
        {t("question.question")} {currentQuestion + 1}:{" "}
        {data.questionDescription}
      </h5>

      <div className="list-answers">
        {data.answer &&
          data.answer.length > 0 &&
          data.answer.map((item, index) => {
            return (
              <div
                className={`form-check ${
                  isShowAnswer && item.isCorrect
                    ? "form-check-dis"
                    : item.isSelected
                    ? "form-check-selected"
                    : ""
                }`}
                key={index}
                disabled={isShowAnswer}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${data.questionId}`}
                  onChange={(e) => {
                    handleCheckInput(
                      e.target.checked,
                      item.id,
                      data.questionId
                    );
                  }}
                  checked={item.isSelected}
                  disabled={isShowAnswer}
                />
                <label className="form-check-label">
                  {item.description}
                  {isShowAnswer &&
                    (item.isCorrect ? (
                      <IoIosCheckmarkCircle className="is-correct" />
                    ) : (
                      <AiFillCloseCircle className="is-false" />
                    ))}
                </label>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
