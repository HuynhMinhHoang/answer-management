import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalCreateUser.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/APIService";

const ModalCreateUser = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("");

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
    toast.success("Reset Data Succcess!");
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
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                      <button
                        type="save"
                        className="btn-save"
                        onClick={() => handleCreateUser()}
                      >
                        Submit
                      </button>
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
    // <>
    //   <Button variant="primary" onClick={handleShow}>
    //     Launch demo modal
    //   </Button>

    //   <Modal
    //     backdrop="static"
    //     show={show}
    //     onHide={handleClose}
    //     animation={true}
    //     size="xl"
    //     aria-labelledby="contained-modal-title-vcenter"
    //     centered
    //   >
    //     <Modal.Header closeButton>
    //       <Modal.Title>Add New User</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <form className="row g-3">
    //         <div className="col-md-6">
    //           <label className="form-label">Email</label>
    //           <input
    //             type="email"
    //             className="form-control"
    //             value={email}
    //             onChange={(e) => {
    //               setEmail(e.target.value);
    //             }}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Password</label>
    //           <input
    //             type="password"
    //             className="form-control"
    //             value={password}
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //             }}
    //           />
    //         </div>

    //         <div className="col-md-6">
    //           <label className="form-label">Username</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             value={username}
    //             onChange={(e) => {
    //               setUsername(e.target.value);
    //             }}
    //           />
    //         </div>
    //         <div className="col-md-6">
    //           <label className="form-label">Role</label>
    //           <select
    //             className="form-select"
    //             onChange={(e) => {
    //               setRole(e.target.value);
    //             }}
    //           >
    //             <option value="USER">USER</option>
    //             <option value="ADMIN">ADMIN</option>
    //           </select>
    //         </div>

    //         <div className="col-md-6 bg-upload">
    //           <label className="form-label upload" htmlFor="inputUpload">
    //             <FaCloudUploadAlt
    //               size={"25px"}
    //               style={{ marginRight: "8px" }}
    //             />
    //             Upload Avatar
    //           </label>
    //           <input
    //             id="inputUpload"
    //             type="file"
    //             hidden
    //             onChange={(e) => handleUploadAvatar(e)}
    //           />
    //         </div>

    //         <div className="col-md-12 img-preview">
    //           {preview ? <img src={preview} /> : <span>Preview Img</span>}
    //         </div>
    //       </form>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleClose}>
    //         Close
    //       </Button>
    //       <Button variant="primary" onClick={handleClose}>
    //         Save Changes
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </>
  );
};

export default ModalCreateUser;
