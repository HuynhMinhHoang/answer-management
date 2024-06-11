import { deleteQuizz } from "../../../../services/APIService";
import "./TableListQuizz.scss";
import React, { useEffect, useState } from "react";
import ImgEdit from "../../../../assets/edit-quizz.png";
import ImgDelete from "../../../../assets/delete.png";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const TableListQuizz = (props) => {
  const { listQuizz, setDataQuizzEdit, fetchListQuizz } = props;

  const handleEditQuizz = (data) => {
    setDataQuizzEdit(data);
  };

  const handleDeleteQuizz = async (id) => {
    let res = await deleteQuizz(id);
    await fetchListQuizz();
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const showAlert = async (item) => {
    Swal.fire({
      html: `
      <p style="font-size: 1.2em">Are you sure to delete Quizz <span style="color: #cc0000; font-weight: 700">[${item.name}]</span>?</p>
      <span style="margin-top: 25px; color: #be0000; font-size: 1em;">You won't be able to revert this!</span>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteQuizz(item.id);
      }
    });
  };

  return (
    <>
      <>
        <div className="table-quizz-container">
          <div className="cards-quizz">
            <div className="card-contents">
              <div className="table-quizz-responsives">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>DESCRIPTION</th>
                      <th>DIFFICULTY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listQuizz && listQuizz.length > 0 ? (
                      listQuizz.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.difficulty}</td>
                          <td>
                            <img
                              src={ImgEdit}
                              className="btn-edit"
                              alt="Edit"
                              onClick={() => {
                                handleEditQuizz(item);
                              }}
                            />
                            <img
                              src={ImgDelete}
                              className="btn-edit"
                              alt="Delete"
                              onClick={() => {
                                showAlert(item);
                              }}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default TableListQuizz;
