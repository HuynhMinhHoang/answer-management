import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDetailQuizzById } from "../../services/APIService";
import _ from "lodash";
import "./DetailQuizz.scss";
import Question from "./Question";

const DetailQuizz = () => {
  const params = useParams();
  const idQuizz = params.id;
  const location = useLocation();

  const [dataQuizz, setDataQuizz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
                answer.push(item.answers);
              });

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

  return (
    <div className="detail-quizz-container">
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
              Previous
            </button>

            <button
              className="btn-next"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>

            <button
              className="btn-finish"
              onClick={() => {
                handleNext();
              }}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="bg-right">count down</div>
      </div>
    </div>
  );
};

export default DetailQuizz;
