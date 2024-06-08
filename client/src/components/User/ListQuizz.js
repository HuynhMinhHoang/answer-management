import React, { useEffect, useState } from "react";
import { getQuizzByUser } from "../../services/APIService";
import "./ListQuizz.scss";
import { useSelector } from "react-redux";
const ListQuizz = () => {
  const [arrQuizz, setArrayQuizz] = useState();

  const isAuthenticated = useSelector(
    (state) => state.userRedux.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
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
      {isAuthenticated ? (
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

          {arrQuizz && arrQuizz.length === 0 && (
            <div>You don't have any Quizz now...</div>
          )}
        </div>
      ) : (
        <div>Pls login</div>
      )}
    </>
  );
};

export default ListQuizz;
