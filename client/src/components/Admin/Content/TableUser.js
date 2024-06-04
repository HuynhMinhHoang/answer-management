import React, { useEffect, useState } from "react";
import "./TableUser.scss";
import { getListUser } from "../../../services/APIService";
import { FaCircleInfo } from "react-icons/fa6";

const TableUser = () => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListUser();
        console.log("res", res.DT);
        setListUser(res.DT);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="cards">
        <div className="card-contents">
          <div className="table-responsives">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th>NO</th>
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
                      <td>{index + 1}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                      <td>
                        <FaCircleInfo />

                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
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
