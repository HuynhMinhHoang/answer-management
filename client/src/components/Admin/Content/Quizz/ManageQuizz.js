import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ManageQuizz.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ModalCRUDQuizz from "./ModalCRUDQuizz";

const ManageQuizz = () => {
  return (
    <div className="manage-qizz-container">
      <div className="add-quizz">
        <div className="title">Add New Quizz</div>
        <p>Use the form below to add or update quizz information.</p>
        <ModalCRUDQuizz />
      </div>
      <div className="table-quizz">{/* <ModalCRUDQuizz /> */}</div>
    </div>
  );
};

export default ManageQuizz;
