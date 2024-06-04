import React from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import TableUser from "./TableUser";

const ManageUser = () => {
  return (
    <div className="manage-user-container">
      <div className="form-add-user">
        <div className="title">Add New User</div>
        <p>Multiple form layouts, you can use.</p>
        <ModalCreateUser />
      </div>

      <div className="table-user">
        <div className="title">Table User</div>
        <p>
          Add <code>.table-bordered</code> for borders on all sides of the table
          and cells. For Inverse Dark Table, add <code>.table-dark</code> along
          with
          <code>.table-bordered</code>.
        </p>
        <TableUser />
      </div>
    </div>
  );
};

export default ManageUser;
