import React, { useEffect, useState } from "react";
import "./TableUser.scss";
import { getListUser, deleteUser } from "../../../services/APIService";
import ImgEdit from "../../../assets/edit.png";
import ImgView from "../../../assets/view1.png";
import ImgDelete from "../../../assets/delete.png";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const TableUser = (props) => {
  const { fetchData, listUser, handleEditUser, viewImageUser } = props;
  // console.log("table", listUser);

  const handleDeleteUser = async (id) => {
    let res = await deleteUser(id);
    console.log("handleDeleteUser", id);
    await fetchData();
    if (res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  // const showAlert = async (item) => {
  //   Swal.fire({
  //     html: `
  //     <p style="font-size: 1.2em">Are you sure to delete user <span style="color: #cc0000; font-weight: 700">[${item.email}]</span>?</p>
  //     <span style="margin-top: 25px; color: #be0000; font-size: 1em;">You won't be able to revert this!</span>
  //   `,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleDeleteUser(item.id);
  //     }
  //   });
  // };

  return (
    <>
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
                            handleDeleteUser(item.id);
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
    </>
  );
};

export default TableUser;
