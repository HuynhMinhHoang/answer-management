import React, { useEffect, useState } from "react";
import { getQuizzByUser } from "../../services/APIService";
import "./ListQuizz.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const ListQuizz = () => {
  const [arrQuizz, setArrayQuizz] = useState();

  const navigate = useNavigate();

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
      <div className="list-quizz-container">
        <div className="bg-tilte">
          <div className="tilte">
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              Home Page
            </span>
            <MdNavigateNext className="icon" />
            <span>Mini Test</span>
          </div>
          {/* <div className="br"></div> */}
        </div>
        {isAuthenticated ? (
          <div className="bg-card">
            {arrQuizz &&
              arrQuizz.length > 0 &&
              arrQuizz.map((item, index) => {
                return (
                  <div className="card" key={index}>
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">Quizz {item.id}</h5>
                      <p className="card-text">{item.description}</p>
                      <button
                        onClick={() => {
                          navigate(`/quizz/${item.id}`, {
                            state: {
                              quizzId: item.id,
                              quizzTitle: item.description,
                            },
                          });
                        }}
                      >
                        Start Now
                      </button>
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
      </div>
    </>
  );
};

export default ListQuizz;
