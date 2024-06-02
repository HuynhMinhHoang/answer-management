import React from "react";
import ModalCreateUser from "./ModalCreateUser";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="title">Manager user</div>
      <div className="user-content">
        <div>
          <div>
            <button>Add new user</button>
          </div>
          <div className="table-user">
            <ModalCreateUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
