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
      image: "",
      answer: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        image: "",
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

  const handleAddRemoveAnser = (type, anwserId, questionId) => {
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
        (item) => item.id !== anwserId
      );
      setQuestion(questionsClone);
    }
  };

  return (
    <div className="manage-question-container">
      <div className="add-quizz">
        <div className="title">Add New Question Of Quizz</div>
        <div className="bg-select-question">
          <label>Select quizz</label>
          <Select
            value={selectedQuizz}
            onChange={setSelectedQuizz}
            options={options}
          />
        </div>

        <div className="card-question-container">
          <label>Add question</label>

          {question &&
            question &&
            question.map((questions, index) => {
              return (
                <div key={index} className="main">
                  <div className="card-question">
                    {/* <p>{index + 1}</p> */}
                    <div className="form-group">
                      {/* <label>Description</label> */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Question Description ${index + 1}`}
                        value={questions.description}
                        // onChange={(e) => setDescription(e.target.value)}
                        // disabled={dataUserEdit ? true : false}
                      />
                    </div>

                    <div className="bg-upload">
                      <label
                        className="form-label upload"
                        htmlFor="inputUpload"
                      >
                        <FaCloudUploadAlt
                          size={"23px"}
                          style={{ marginRight: "8px" }}
                        />
                        Image
                      </label>
                      <input
                        id="inputUpload"
                        type="file"
                        hidden
                        // onChange={(e) => handleUploadAvatar(e)}
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
                          <div className="bg-anwser">
                            <div className="bg-checkbox">
                              <input className="checkbox" type="checkbox" />
                            </div>
                            <div className="form-group">
                              {/* <label>Description</label> */}
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Answer ${index + 1}`}
                                value={answer.description}
                                // onChange={(e) => setDescription(e.target.value)}
                                // disabled={dataUserEdit ? true : false}
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
