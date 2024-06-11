import React from "react";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ModalCRUDQuizz.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { createNewQuizz } from "../../../../services/APIService";
import _ from "lodash";

const ModalCRUDQuizz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const handleUploadAvatar = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (!name) {
        toast.error("Please enter a name!");
        return;
      }
      if (!description) {
        toast.error("Please enter a description!");
        return;
      }
      if (!type) {
        toast.error("Please enter a type!");
        return;
      }
      if (_.isEmpty(preview)) {
        toast.error("Please choose a photo for the quizz!");
        return;
      }

      let res = await createNewQuizz(description, name, type, image);
      console.log("=>>>res", res);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        setName("");
        setDescription("");
        setType("");
        setPreview("");
        setImage("");
      } else {
        toast.error(res.EM);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resetData = () => {
    setName("");
    setDescription("");
    setType("");
    setPreview("");
    setImage("");
    toast.success("Reset Data Succcess!");
  };

  return (
    <>
      <div className="card-quizz-container">
        <div className="card">
          <div className="card-content">
            <div className="card-body">
              <div className="form form-vertical">
                <div className="form-body">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          // disabled={dataUserEdit ? true : false}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label className="contact-info-vertical">
                          Quizz type
                        </label>
                        <select
                          className="form-control"
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                          placeholder="Quizz type..."
                        >
                          <option value="" disabled>
                            Quizz type...
                          </option>
                          <option value="EASY">EASY</option>
                          <option value="MEDIUM">MEDIUM</option>
                          <option value="HARD">HARD</option>
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
                        Upload Image Quizz
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
                        <img src={preview} alt="img" />
                      ) : (
                        <span>Please choose photo...</span>
                      )}
                    </div>

                    <div className="col-12 d-flex justify-content-end">
                      {/* <button
                     type="save"
                     className="btn-update"
                     onClick={() => showAlert()}
                   >
                     Save
                   </button> */}

                      <button
                        type="save"
                        className="btn-save"
                        onClick={() => handleCreateUser()}
                      >
                        Create
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
  );
};

export default ModalCRUDQuizz;
