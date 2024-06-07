import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { postCreateNewUser, updateUser } from "../../../services/APIService";
import "./ModalCRUDUser.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const ModalCRUDUser = (props) => {
  const {
    fetchData,
    dataUserEdit,
    resetDataUserEdit,
    fetchDataPaginate,
    currentPage,
    setCurrentPage,
  } = props;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");

  //handle create user
  const handleUploadAvatar = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleCreateUser = async () => {
    if (!username) {
      toast.error("Username is required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Email is not valid!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    let res = await postCreateNewUser(email, username, password, role, avatar);
    if (res && res.EC === 0) {
      setEmail("");
      setUsername("");
      setPassword("");
      setAvatar("");
      setPreview("");
      setCurrentPage();
      await fetchDataPaginate(1);
      toast.success(res.EM);
      console.log(res);
    } else {
      toast.error(res.EM);
      console.log(res);
    }
  };

  const resetData = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setAvatar("");
    setPreview("");
    resetDataUserEdit(null);
    toast.success("Reset Data Succcess!");
  };

  //handle update user
  useEffect(() => {
    if (dataUserEdit) {
      setUsername(dataUserEdit.username);
      setEmail(dataUserEdit.email);
      setRole(dataUserEdit.role);
      if (dataUserEdit.image) {
        setAvatar(dataUserEdit.image);
        setPreview(`data:image/jpeg;base64,${dataUserEdit.image}`);
      } else {
        setAvatar("");
        setPreview("");
      }
    }
  }, [dataUserEdit]);

  const handleUpdateUser = async () => {
    if (!username) {
      toast.error("Username is not valid!");
      return;
    }

    let res = await updateUser(dataUserEdit.id, username, role, avatar);
    if (res && res.EC === 0) {
      setUsername("");
      setEmail("");
      setPassword("");
      setAvatar("");
      setPreview("");
      await fetchDataPaginate(currentPage);
      resetDataUserEdit(null);
      toast.success(res.EM);
      console.log(res);
    } else {
      toast.error(res.EM);
      console.log(res);
    }
  };

  const showAlert = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      // showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdateUser();
      } else if (result.isDenied) {
        toast.info("Changes are not saved!");
      }
    });
  };

  return (
    <>
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="form form-vertical">
                <div className="form-body">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={dataUserEdit ? true : false}
                        />
                      </div>
                    </div>

                    <div
                      className="col-12"
                      // hidden={dataUserEdit ? true : false}
                    >
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={dataUserEdit ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="contact-info-vertical">Role</label>
                        <select
                          className="form-control"
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                          }}
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6 bg-upload">
                      <label
                        className="form-label upload"
                        htmlFor="inputUpload"
                      >
                        <FaCloudUploadAlt
                          size={"23px"}
                          style={{ marginRight: "8px" }}
                        />
                        Upload Avatar
                      </label>
                      <input
                        id="inputUpload"
                        type="file"
                        hidden
                        onChange={(e) => handleUploadAvatar(e)}
                      />
                    </div>

                    <div className="col-md-12 img-preview">
                      {preview ? (
                        <img src={preview} />
                      ) : (
                        <span>Please choose photo...</span>
                      )}
                    </div>

                    <div className="col-12 d-flex justify-content-end">
                      {dataUserEdit ? (
                        <button
                          type="save"
                          className="btn-update"
                          onClick={() => showAlert()}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="save"
                          className="btn-save"
                          onClick={() => handleCreateUser()}
                        >
                          Create
                        </button>
                      )}
                      <button
                        type="cancel"
                        className="btn-cancel"
                        onClick={() => resetData()}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
