import React, { useEffect, useState } from "react";
import "./HistoryQuizz.scss";
import { useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { useTranslation, Trans } from "react-i18next";
import { getListHistoryQuizz } from "../../services/APIService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const HistoryQuizz = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [listHistory, setListHistory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListHistoryQuizz();
      const reversedData = res.DT.data.reverse();   
      const formattedData = reversedData.map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
      }));

      setListHistory(formattedData);
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <>
        <div className="history-quizz-container">
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
              <span>{t("listquizz.tilte3")}</span>
            </div>
          </div>

          <div className="table-list-history">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Quiz Name</TableCell>
                    <TableCell>Total Questions</TableCell>
                    <TableCell>Total Correct</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listHistory &&
                    listHistory.length > 0 &&
                    listHistory.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell>{quiz.id}</TableCell>
                        <TableCell>{quiz.quizHistory.name}</TableCell>
                        <TableCell>{quiz.total_questions}</TableCell>
                        <TableCell>{quiz.total_correct}</TableCell>
                        <TableCell>{quiz.createdAt}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </>
    </div>
  );
};

export default HistoryQuizz;
