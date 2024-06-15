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
import { getQuizzByQuestionAnswer } from "../../../../services/APIService";

import {
  getListQuizz,
  createNewQuestionForQuizz,
  createNewAnswerForQuestion,
} from "../../../../services/APIService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageQuestion = () => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answer: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];

  const [listQuizz, setListQuizz] = useState([]);
  const [selectedQuizz, setSelectedQuizz] = useState({});

  const [isPreviewImg, setIsPreviewImg] = useState(false);
  const [dataPreviewImg, setDataPreviewImg] = useState({
    title: "",
    url: "",
  });
  const [question, setQuestion] = useState(initQuestion);

  const [mode, setMode] = useState("create");

  useEffect(() => {
    fetchListQuizz();
  }, []);

  useEffect(() => {
    if (selectedQuizz && selectedQuizz.value) {
      fetchQuizzByQA();
    }
  }, [selectedQuizz]);

  const urltoFile = (url, filename, mimeType) => {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  const fetchQuizzByQA = async () => {
    let res = await getQuizzByQuestionAnswer(selectedQuizz.value);
    if (res && res.EC === 0) {
      if (res.DT.qa && res.DT.qa.length > 0) {
        const fetchedQuestions = await Promise.all(
          res.DT.qa.map(async (item) => {
            let imageFile = null;
            if (item.imageFile) {
              imageFile = await urltoFile(
                `data:image/png;base64,${item.imageFile}`,
                `Question-${item.id}.png`,
                `image/png`
              );
            }
            return {
              id: item.id,
              description: item.description,
              imageFile: imageFile,
              imageName: item.imageFile ? `Question-${item.id}.png` : "",
              answer: item.answers.map((ans) => ({
                id: ans.id,
                description: ans.description,
                isCorrect: ans.isCorrect,
              })),
            };
          })
        );
        setQuestion(fetchedQuestions);
        setMode("update");
      } else {
        setQuestion(initQuestion);
        setMode("create");
      }
    }
  };

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

  const validateCheckboxes = (questions) => {
    for (let i = 0; i < questions.length; i++) {
      const hasCorrectAnswer = questions[i].answer.some(
        (answer) => answer.isCorrect
      );
      if (!hasCorrectAnswer) {
        return { isValid: false, questionIndex: i };
      }
    }
    return { isValid: true };
  };

  const handleCreateQuestionForQuizz = async () => {
    //validate
    if (_.isEmpty(selectedQuizz)) {
      toast.error("Please choose a quizz!");
      return;
    }

    //validate questions
    let isValidateQuestion = true;
    let indexQ2 = 0;
    for (let i = 0; i < question.length; i++) {
      if (!question[i].description) {
        isValidateQuestion = false;
        indexQ2 = i;
        break;
      }
    }
    if (isValidateQuestion === false) {
      toast.error(
        <div>
          Please not empty description for
          <b style={{ color: "#E74C3C" }}> Question {indexQ2 + 1}</b>!
        </div>
      );
      return;
    }

    //validate answers
    let isValidateAnswer = true;
    let indexQ1 = 0,
      indexA = 0;
    for (let i = 0; i < question.length; i++) {
      for (let j = 0; j < question[i].answer.length; j++) {
        if (!question[i].answer[j].description) {
          isValidateAnswer = false;
          indexA = j;
          indexQ1 = i;

          break;
        }
      }
      if (isValidateAnswer === false) break;
    }
    if (isValidateAnswer === false) {
      toast.error(
        <div>
          Please not empty
          <b style={{ color: "#E74C3C" }}> Answer {indexA + 1}</b> at
          <b style={{ color: "#E74C3C" }}> Question {indexQ1 + 1}</b>!
        </div>
      );
      return;
    }

    //validate checkboxes
    const { isValid, questionIndex } = validateCheckboxes(question);
    if (!isValid) {
      toast.error(
        <div>
          Please select at least one correct answer for
          <b style={{ color: "#E74C3C" }}> Question {questionIndex + 1}</b>!
        </div>
      );
      return;
    }

    //submit question
    await Promise.all(
      question.map(async (questions) => {
        const q = await createNewQuestionForQuizz(
          +selectedQuizz.value,
          questions.description,
          questions.imageFile
        );

        //submit answer
        await Promise.all(
          questions.answer.map(async (answers) => {
            await createNewAnswerForQuestion(
              answers.description,
              answers.isCorrect,
              q.DT.id
            );
          })
        );
      })
    );

    toast.success("Create question successfully!");
    setQuestion(initQuestion);
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

  const handleUpdateQuestionForQuizz = () => {};

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

          {mode === "create" ? (
            <div className="bg-btnSave">
              <button
                type="save"
                className="btn-save"
                onClick={handleCreateQuestionForQuizz}
              >
                Create Question
              </button>
            </div>
          ) : (
            <div className="bg-btnSave">
              <button
                type="save"
                className="btn-save"
                onClick={handleUpdateQuestionForQuizz}
              >
                Save Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestion;
