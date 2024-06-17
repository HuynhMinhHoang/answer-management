import React, { useEffect, useRef } from "react";
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

const DashBoard = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.userRedux.user);

  const dispatch = useDispatch();
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
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

    if (chartRef && chartRef.current) {
      new Chart(chartRef.current, config);
    }
  }, []);

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
                <div className="bg-avt">
                  <img src={ImgAVT} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Users</p>
                  <p>112.000</p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt">
                  <img src={ImgAVT} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Quizzes</p>
                  <p>112.000</p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt">
                  <img src={ImgAVT} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Questions</p>
                  <p>112.000</p>
                </div>
              </div>

              <div className="bg-item1">
                <div className="bg-avt">
                  <img src={ImgAVT} alt="avt" />
                </div>

                <div className="bg-text">
                  <p>Total Answers</p>
                  <p>112.000</p>
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
