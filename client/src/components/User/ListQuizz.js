import React, { useEffect, useState } from "react";
import { getQuizzByUser } from "../../services/APIService";
import "./ListQuizz.scss";
const ListQuizz = () => {
  const [arrQuizz, setArrayQuizz] = useState();

  useEffect(() => {
    const getListQuizz = async () => {
      try {
        let res = await getQuizzByUser();
        setArrayQuizz(res.DT);
        console.log("quizz", res);
      } catch (e) {
        console.log(e);
      }
    };

    getListQuizz();
  }, []);
  return (
    <>
      <div className="list-quizz-container">
        {arrQuizz &&
          arrQuizz.length > 0 &&
          arrQuizz.map((item, index) => {
            return (
              <div className="card" style={{ width: "18rem" }} key={index}>
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Quizz {item.id}</h5>
                  <p className="card-text">{item.description}</p>
                  <button>Start Now</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListQuizz;
