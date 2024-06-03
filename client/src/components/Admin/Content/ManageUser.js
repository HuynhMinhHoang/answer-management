import React from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">Add New User</div>
      <p>Multiple form layouts, you can use.</p>
      <div className="user-table">
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
