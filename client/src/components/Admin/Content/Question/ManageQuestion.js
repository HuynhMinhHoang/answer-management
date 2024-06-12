import React, { useEffect, useState } from "react";
import "./ManageQuestion.scss";
import Select from "react-select";
import { FaCloudUploadAlt } from "react-icons/fa";
import ImgAdd from "../../../../assets/add.png";
import ImgRemove from "../../../../assets/remove.png";
import ImgAddAnswer from "../../../../assets/plus.png";
import ImgRemoveAnswer from "../../../../assets/delete-answer.png";
import { v4 as uuidv4 } from "uuid";
import _, { create } from "lodash";
import { GrPowerReset } from "react-icons/gr";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Lightbox from "react-awesome-lightbox";
import { FaImage } from "react-icons/fa";
import {
  getListQuizz,
  createNewQuestionForQuizz,
  createNewAnswerForQuestion,
} from "../../../../services/APIService";

const ManageQuestion = () => {
  const [listQuizz, setListQuizz] = useState([]);
  const [selectedQuizz, setSelectedQuizz] = useState({});

  const [isPreviewImg, setIsPreviewImg] = useState(false);
  const [dataPreviewImg, setDataPreviewImg] = useState({
    title: "",
    url: "",
  });
  const [question, setQuestion] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answer: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ]);

  useEffect(() => {
    fetchListQuizz();
  }, []);

  const fetchListQuizz = async () => {
    try {
      let res = await getListQuizz();
      let newQuizz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuizz(newQuizz);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddRemoveQuestion = async (type, id) => {
    await alert();

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

  const handleAddRemoveAnswer = async (type, answerId, questionId) => {
    await alert();

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

  const alert = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Processing!",
        html: "<b>Please, just a moment...</b>",
        timer: 700,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
        resolve();
      });
    });
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

  const handleCreateQuestionForQuizz = async () => {
    //validate

    //submit question
    await Promise.all(
      question.map(async (questions) => {
        const q = await createNewQuestionForQuizz(
          +selectedQuizz.value,
          questions.description,
          questions.imageFile
        );
      })
    );

    //submit answer
  };

  const handlePreviewImg = (questionId) => {
    let questionsClone = _.cloneDeep(question);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataPreviewImg({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImg(true);
      console.log(dataPreviewImg);
    }
  };

  return (
    <div className="manage-question-container">
      <div className="add-quizz">
        <div className="title">Add New Question Of Quizz</div>
        <div className="bg-select-question">
          <label>Select Quizz</label>
          <Select
            options={listQuizz}
            defaultValue={selectedQuizz}
            onChange={setSelectedQuizz}
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
                      {questions.imageName ? (
                        <label className="form-label upload">
                          <FaImage
                            className="viewImg"
                            size={"27px"}
                            // style={{ marginLeft: "30px" }}
                            onClick={() => {
                              handlePreviewImg(questions.id);
                            }}
                          />
                        </label>
                      ) : (
                        <label
                          className="form-label upload"
                          htmlFor={`${questions.id}`}
                        >
                          <FaCloudUploadAlt
                            size={"27px"}
                            // style={{ marginRight: "8px" }}
                          />
                        </label>
                      )}

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
                                handleAddRemoveAnswer("ADD", "", questions.id);
                              }}
                            />

                            {questions.answer.length > 1 && (
                              <img
                                src={ImgRemoveAnswer}
                                alt="remove"
                                onClick={() => {
                                  handleAddRemoveAnswer(
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

                  {isPreviewImg === true && (
                    <Lightbox
                      image={dataPreviewImg.url}
                      title={dataPreviewImg.title}
                      onClose={() => {
                        setIsPreviewImg(false);
                      }}
                    ></Lightbox>
                  )}
                </div>
              );
            })}
          {question.length > 0 && (
            <div className="bg-btnSave">
              <button
                type="save"
                className="btn-save"
                onClick={handleCreateQuestionForQuizz}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
