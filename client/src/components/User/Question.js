import _ from "lodash";
import React from "react";

const Question = (props) => {
  const { currentQuestion, data, handleCheckFromParent } = props;

  // console.log("data", data);

  if (_.isEmpty(data)) {
    return <div>Loading...</div>;
  }

  const handleCheckInput = (e, answerId, questionId) => {
    // console.log("handleCheckInput", e);
    handleCheckFromParent(answerId, questionId);
  };

  return (
    <>
      {data.image ? (
        <div className="bg-img">
          <img src={`data:image/jpeg;base64,${data.image}`} alt="img" />
        </div>
      ) : (
        <div className="bg-img">No photos to show...</div>
      )}
      <h5>
        Question {currentQuestion + 1}: {data.questionDescription}
      </h5>

      <div className="list-answers">
        {data.answer &&
          data.answer.length > 0 &&
          data.answer.map((item, index) => {
            return (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    handleCheckInput(
                      e.target.checked,
                      item.id,
                      data.questionId
                    );
                  }}
                  checked={item.isSelected}
                />
                <label className="form-check-label">{item.description}</label>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
