import React, { useEffect, useState } from "react";
import "./TableUser.scss";
import { getListUser } from "../../../services/APIService";
import ImgEdit from "../../../assets/edit.png";
import ImgView from "../../../assets/view1.png";
import ImgDelete from "../../../assets/delete.png";

const TableUser = (props) => {
  const { listUser, handleEditUser } = props;
  // console.log("table", listUser);

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
                        <img src={ImgView} className="btn-edit" alt="View" />
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
