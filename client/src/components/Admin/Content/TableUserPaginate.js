import React, { useEffect, useState } from "react";
import "./TableUser.scss";
import { getListUser, deleteUser } from "../../../services/APIService";
import ImgEdit from "../../../assets/edit.png";
import ImgView from "../../../assets/view1.png";
import ImgDelete from "../../../assets/delete.png";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  const {
    fetchData,
    listUser,
    handleEditUser,
    viewImageUser,
    fetchDataPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
  } = props;

  const handlePageClick = (event) => {
    fetchDataPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = async (id) => {
    let res = await deleteUser(id);
    console.log("handleDeleteUser", id);
    setCurrentPage(1);
    await fetchDataPaginate(1);
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const showAlert = async (item) => {
    Swal.fire({
      html: `
      <p style="font-size: 1.2em">Are you sure to delete user <span style="color: #cc0000; font-weight: 700">[${item.email}]</span>?</p>
      <span style="margin-top: 25px; color: #be0000; font-size: 1em;">You won't be able to revert this!</span>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(item.id);
      }
    });
  };

  return (
    <>
      <div className="table-user-container">
        <div className="cards">
          <div className="card-contents">
            <div className="table-responsives">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser && listUser.length > 0 ? (
                    listUser.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <img
                            src={ImgView}
                            className="btn-edit"
                            alt="View"
                            onClick={() => {
                              viewImageUser(item.image);
                            }}
                          />
                          <img
                            src={ImgEdit}
                            className="btn-edit"
                            alt="Edit"
                            onClick={() => {
                              handleEditUser(item);
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
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
