import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getDetailQuizzById,
  submitQuizzFinish,
} from "../../services/APIService";
import _ from "lodash";
import "./DetailQuizz.scss";
import Question from "./Question";
import ModalResultQuizz from "./ModalResultQuizz";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { toast } from "react-toastify";
import { MdNavigateNext } from "react-icons/md";
import { MdDone } from "react-icons/md";
import ModalCountDownQuizz from "./ModalCountDownQuizz.js";
import { useTranslation, Trans } from "react-i18next";

const DetailQuizz = () => {
  const { t } = useTranslation();

  const params = useParams();
  const idQuizz = params.id;
  const location = useLocation();
  const navigate = useNavigate();

  const [dataQuizz, setDataQuizz] = useState([]);
  const [dataModalResult, setDataModalResult] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleCheckFromParent = (answerId, questionId) => {
    // console.log("dataQuizz", dataQuizz);
    // console.log("Check from parent", answerId, questionId);
    let dataQuizzClone = _.cloneDeep(dataQuizz);
    let question = _.find(dataQuizzClone, (item) => {
      return +item.questionId === +questionId;
    });

    if (question && question.answer) {
      let changeCheckbox = question.answer.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answer = changeCheckbox;
      // console.log("=>>>", changeCheckbox);
    }

    let index = dataQuizzClone.findIndex((item) => {
      return +item.questionId === +questionId;
    });

    if (index > -1) {
      dataQuizzClone[index] = question;
      setDataQuizz(dataQuizzClone);
    }
  };

  useEffect(() => {
    const getDetailQuizz = async () => {
      try {
        let res = await getDetailQuizzById(idQuizz);

        if (res && res.EC === 0) {
          let raw = res.DT;
          let data = _.chain(raw)
            .groupBy("id")
            .map((value, key) => {
              let questionDescription,
                image = null;
              let answer = [];

              value.forEach((item, index) => {
                if (index === 0) {
                  questionDescription = item.description;
                  image = item.image;
                }
                item.answers.isSelected = false;
                answer.push(item.answers);
              });
              answer = _.orderBy(answer, ["id"], ["asc"]);
              return { questionId: key, answer, questionDescription, image };
            })
            .value();

          setDataQuizz(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getDetailQuizz();
  }, [idQuizz]);

  const handleNext = () => {
    if (dataQuizz && dataQuizz.length > currentQuestion + 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrev = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleFinish = async () => {
    let payloadData = {
      quizId: +idQuizz,
      answers: [],
    };

    let answers = [];
    if (dataQuizz && dataQuizz.length > 0) {
      dataQuizz.forEach((item) => {
        let questionId = +item.questionId;
        let userAnswerId = [];
        item.answer.forEach((answer) => {
          if (answer.isSelected === true) userAnswerId.push(answer.id);
        });
        answers.push({ questionId, userAnswerId });
      });
    }

    payloadData.answers = answers;
    // console.log("dataQuizz", dataQuizz);
    // console.log("payloadData", payloadData);

    let res = await submitQuizzFinish(payloadData);
    console.log("submitQuizzFinish", res);
    if (res && res.EC === 0) {
      setDataModalResult(res.DT);
      handleShow();
      toast.success(res.EM);
    }
  };

  const showAlert = async () => {
    Swal.fire({
      html: `
      <p style="font-size: 1.2em">Are you sure you want to submit your answers? <span style="color: #cc0000; font-weight: 700">[Quizz ${idQuizz}]</span>?</p>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        handleFinish();
      }
    });
  };

  return (
    <div className="detail-quizz-container">
      <div className="bg-tilte">
        <div className="tilte">
          <span
            onClick={() => {
              navigate("/");
            }}
          >
            {t("listquizz.tilte1")}
          </span>
          <MdNavigateNext className="icon" />
          <span
            onClick={() => {
              navigate("/users");
            }}
          >
            {t("listquizz.tilte2")}
          </span>
          <MdNavigateNext className="icon" />
          <span>Quizz {idQuizz}</span>
        </div>
        {/* <div className="br"></div> */}
      </div>
      <div className="bg">
        <div className="bg-left">
          <div className="tilte">
            Quizz {location?.state.quizzId}: {location?.state.quizzTitle}
          </div>
          <div className="br"></div>
          {/* <div>
          <p>Questions1: Look at the picture and listen to the sentences.</p>
        </div> */}
          <div className="bg-question">
            {/* question */}
            <Question
              handleCheckFromParent={handleCheckFromParent}
              currentQuestion={currentQuestion}
              data={
                dataQuizz && dataQuizz.length > 0
                  ? dataQuizz[currentQuestion]
                  : []
              }
            />
          </div>

          <div className="bg-btn">
            <button
              className="btn-prev"
              onClick={() => {
                handlePrev();
              }}
            >
              <MdNavigateNext className="icon-prev" />
              {t("detailquizz.prev")}
            </button>

            <button
              className="btn-next"
              onClick={() => {
                handleNext();
              }}
            >
              {t("detailquizz.next")}
              <MdNavigateNext className="icon-next" />
            </button>

            <button
              className="btn-finish"
              onClick={() => {
                showAlert();
              }}
            >
              <MdDone className="icon-fi" />
              {t("detailquizz.finish")}
            </button>
          </div>
        </div>
        <div className="bg-right">
          <ModalCountDownQuizz
            dataQuizz={dataQuizz}
            handleFinish={handleFinish}
            setCurrentQuestion={setCurrentQuestion}
          />
        </div>
      </div>

      <ModalResultQuizz
        show={showModal}
        handleClose={handleClose}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuizz;
