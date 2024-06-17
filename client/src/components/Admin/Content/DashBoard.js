import React, { useEffect, useRef, useState } from "react";
import Languages from "../../Header/Languages";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-toastify";
import { FcBusinessman } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../services/APIService";
import { doLogout } from "../../../redux/action/userAction";
import Swal from "sweetalert2";
import "./DashBoard.scss";
import ImgAVT from "../../../assets/vi.png";
import Chart from "chart.js/auto";
import { statsDashBoard } from "../../../services/APIService";

import ImgUser from "../../../assets/user.png";
import ImgQuizz from "../../../assets/quizz.png";
import ImgQuestion from "../../../assets/question.png";
import ImgAnswer from "../../../assets/answer.png";

const DashBoard = () => {
  const { t } = useTranslation();
  const [listStats, setListStats] = useState(null);

  const user = useSelector((state) => state.userRedux.user);

  const dispatch = useDispatch();
  const chartRef = useRef(null);

  const fetchListStats = async () => {
    try {
      let res = await statsDashBoard();
      console.log("<<<<", res.DT.others);
      setListStats(res.DT);
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };
  useEffect(() => {
    fetchListStats();
  }, []);

  useEffect(() => {
    if (listStats) {
      const labels = ["Quizzes", "Questions", "Answers"];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Stats Systems",
            data: [
              listStats?.others?.countQuiz ?? 0,
              listStats?.others?.countQuestions ?? 0,
              listStats?.others?.countAnswers ?? 0,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
            ],
            borderWidth: 1,
          },
        ],
      };

      const config = {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      let chartInstance = null;

      if (chartRef.current) {
        chartInstance = new Chart(chartRef.current, config);
      }

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [listStats]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    });

    if (result.isConfirmed) {
      let res = await logoutUser(user.email, user.refresh_token);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        dispatch(doLogout());
      } else {
        toast.error(res.EM);
      }
    }
  };

  return (
    <>
      <div className="dash-container">
        <div className="bg-item">
          <Languages />

          <NavDropdown title={t("header.setting")} id="basic-nav-dropdown">
            <NavDropdown.Item>
              <FcBusinessman className="settings-icon" />
              <p>{user.username}</p>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
              {t("header.logout")}
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>

      <div className="content-container">
        <div className="page-heading">Profile Statistics</div>

        <div className="page-content">
          <div className="page-content-left">
            <div className="bg-item-header">
              <div className="bg-item1">
                <div className="bg-avt user">
                  <img src={ImgUser} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Users</p>
                  <p>
                    {listStats?.users?.total !== undefined
                      ? listStats.users.total
                      : 0}
                  </p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt quizz">
                  <img src={ImgQuizz} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Quizzes</p>
                  <p>
                    {listStats?.others?.countQuiz !== undefined
                      ? listStats.others.countQuiz
                      : 0}
                  </p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt question">
                  <img src={ImgQuestion} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Questions</p>
                  <p>
                    {listStats?.others?.countQuestions !== undefined
                      ? listStats.others.countQuestions
                      : 0}
                  </p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt answer">
                  <img src={ImgAnswer} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Answers</p>
                  <p>
                    {listStats?.others?.countAnswers !== undefined
                      ? listStats.others.countAnswers
                      : 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-chart">
              <div className="title-stats">System Statistics</div>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          <div className="page-content-right">
            <div className="bg-avt">
              <img src={ImgAVT} alt="avt" />
            </div>

            <div className="bg-text">
              <p>Huynh Hoang</p>
              <p>@hminhhoangdev</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
