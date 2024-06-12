import React, { useState } from "react";
import "./ManageQuestion.scss";
import Select from "react-select";
import { FaCloudUploadAlt } from "react-icons/fa";
import ImgAdd from "../../../../assets/add.png";
import ImgRemove from "../../../../assets/remove.png";
import ImgAddAnswer from "../../../../assets/plus.png";
import ImgRemoveAnswer from "../../../../assets/delete-answer.png";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const ManageQuestion = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuizz, setSelectedQuizz] = useState({});

  const [question, setQuestion] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answer: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answer: [{ id: uuidv4(), description: "", isCorrect: false }],
      };

      setQuestion([...question, newQuestion]);
    }

    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(question);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestion(questionsClone);
    }
  };

  const handleAddRemoveAnser = (type, answerId, questionId) => {
    let questionsClone = _.cloneDeep(question);

    if (type === "ADD") {
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answer.push(newAnswer);
      setQuestion(questionsClone);
    }

    if (type === "REMOVE") {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answer = questionsClone[index].answer.filter(
        (item) => item.id !== answerId
      );
      setQuestion(questionsClone);
    }
  };

  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(question);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestion(questionsClone);
      }
    }
  };

  const handleOnChangeFileImgQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(question);

    let index = questionsClone.findIndex((item) => item.id === questionId);

    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestion(questionsClone);
      console.log(questionsClone);
    }
  };

  const handleCheckboxAnswer = (type, answerId, questionId, e) => {
    let questionsClone = _.cloneDeep(question);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answer = questionsClone[index].answer.map(
        (answer) => {
          if (answer.id === answerId) {
            // Use === for comparison
            if (type === "CHECKBOX") {
              answer.isCorrect = e;
            }
            if (type === "INPUT") {
              answer.description = e;
            }
          }
          return answer;
        }
      );
      setQuestion(questionsClone);
    }
  };

  return (
    <div className="manage-question-container">
      <div className="add-quizz">
        <div className="title">Add New Question Of Quizz</div>
        <div className="bg-select-question">
          <label>Select Quizz</label>
          <Select
            value={selectedQuizz}
            onChange={setSelectedQuizz}
            options={options}
          />
        </div>

        <div className="card-question-container">
          <div className="bg-tilte">
            <label>Add question</label>
          </div>

          {question &&
            question &&
            question.map((questions, index) => {
              return (
                <div key={index} className="main">
                  <div className="card-question">
                    <p>Question {index + 1}</p>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Description`}
                        value={questions.description}
                        onChange={(e) =>
                          handleOnChange(
                            "QUESTION",
                            questions.id,
                            e.target.value
                          )
                        }
                        // disabled={dataUserEdit ? true : false}
                      />
                    </div>

                    <div className="bg-upload">
                      <label
                        className="form-label upload"
                        htmlFor={`${questions.id}`}
                      >
                        <FaCloudUploadAlt
                          size={"23px"}
                          style={{ marginRight: "8px" }}
                        />
                        {questions.imageName ? questions.imageName : "0 file"}
                      </label>
                      <input
                        id={`${questions.id}`}
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleOnChangeFileImgQuestion(questions.id, e)
                        }
                      />
                    </div>
                    <div className="bg-btn">
                      <img
                        src={ImgAdd}
                        alt="add"
                        onClick={() => {
                          handleAddRemoveQuestion("ADD", "");
                        }}
                      />

                      {question.length > 1 && (
                        <img
                          src={ImgRemove}
                          alt="remove"
                          onClick={() => {
                            handleAddRemoveQuestion("REMOVE", questions.id);
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {questions.answer &&
                    questions.answer.length > 0 &&
                    questions.answer.map((answer, index) => {
                      return (
                        <div key={index} className="answer-container">
                          <div className="bg-answer">
                            <div className="bg-checkbox">
                              <input
                                className="checkbox"
                                type="checkbox"
                                checked={answer.isCorrect}
                                onChange={(e) => {
                                  handleCheckboxAnswer(
                                    "CHECKBOX",
                                    answer.id,
                                    questions.id,
                                    e.target.checked
                                  );
                                }}
                              />
                            </div>
                            <div className="form-group">
                              {/* <label>Description</label> */}
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Answer ${index + 1}`}
                                value={answer.description}
                                onChange={(e) => {
                                  handleCheckboxAnswer(
                                    "INPUT",
                                    answer.id,
                                    questions.id,
                                    e.target.value
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="bg-btn-answer">
                            <img
                              src={ImgAddAnswer}
                              alt="add"
                              onClick={() => {
                                handleAddRemoveAnser("ADD", "", questions.id);
                              }}
                            />

                            {questions.answer.length > 1 && (
                              <img
                                src={ImgRemoveAnswer}
                                alt="remove"
                                onClick={() => {
                                  handleAddRemoveAnser(
                                    "REMOVE",
                                    answer.id,
                                    questions.id
                                  );
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
