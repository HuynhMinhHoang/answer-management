import React, { useEffect, useState } from "react";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { getListUser, getListUserPaginate } from "../../../services/APIService";
import { ModalCRUDUser } from "./ModalCRUDUser";
import ModalViewImage from "./ModalViewImage";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = () => {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("current page", currentPage);

  const [listUser, setListUser] = useState([]);
  const [dataUserEdit, setdataUserEdit] = useState(null);
  const [dataImageUser, setDataImageUser] = useState(null);
  const [openModal, setOpentModal] = useState(false);

  useEffect(() => {
    // fetchData();
    fetchDataPaginate(currentPage);
  }, []);

  const fetchData = async () => {
    try {
      const res = await getListUser();
      setListUser(res.DT);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDataPaginate = async (page) => {
    try {
      let res = await getListUserPaginate(page, LIMIT_USER);
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditUser = (user) => {
    setdataUserEdit(user);
  };

  const resetDataUserEdit = () => {
    setdataUserEdit(null);
  };

  const viewImageUser = (avatar) => {
    setDataImageUser(avatar);
    setOpentModal(true);
  };

  const closeModal = () => {
    setOpentModal(false);
  };

  return (
    <div className="manage-user-container">
      <div className="form-add-user">
        {dataUserEdit ? (
          <div className="title">Update User</div>
        ) : (
          <div className="title">Add New User</div>
        )}

        <p>Use the form below to add or update user information.</p>
        <ModalCRUDUser
          fetchData={fetchData}
          dataUserEdit={dataUserEdit}
          resetDataUserEdit={resetDataUserEdit}
          fetchDataPaginate={fetchDataPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="table-user">
        <div className="title">Table User</div>
        <p>
          The table below displays user information.
          <code> Click</code> on a user to <code> edit</code> their details or
          <code> view</code> their profile picture.
        </p>
        {/* <TableUser
          listUser={listUser}
          handleEditUser={handleEditUser}
          viewImageUser={viewImageUser}
          fetchData={fetchData}
        /> */}
        <TableUserPaginate
          listUser={listUser}
          handleEditUser={handleEditUser}
          viewImageUser={viewImageUser}
          fetchData={fetchData}
          fetchDataPaginate={fetchDataPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div className="image-user">
        <ModalViewImage
          dataImageUser={dataImageUser}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default ManageUser;
