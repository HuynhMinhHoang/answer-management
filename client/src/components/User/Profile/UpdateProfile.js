import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./UpdateProfile.scss";
import { useSelector } from "react-redux";
import { FcSwitchCamera } from "react-icons/fc";
import {
  updateProfileUser,
  changePasswordUser,
} from "../../../services/APIService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin, doUpdateUser } from "../../../redux/action/userAction";
import { useTranslation } from "react-i18next";

const UpdateProfile = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");

  const [preview, setPreview] = useState("");

  // change password
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useSelector((state) => state.userRedux.user);
  // console.log("user", user.image);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setRole(user.role);
      if (user.image) {
        setPreview(`data:image/jpeg;base64,${user.image}`);
      }
    }
  }, [user]);

  const handleSaveChanges = async () => {
    //validate password
    if (changePassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all password fields!");
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      //change password
      const resPassword = await changePasswordUser(
        currentPassword,
        newPassword
      );
      if (resPassword && resPassword.EC !== 0) {
        toast.error(resPassword.EM);
        return;
      }
    }

    //update profile
    let res = await updateProfileUser(username, imageFile);
    // console.log("imageFile", imageFile);
    // console.log("preview", preview);

    if (res && res.EC === 0) {
      const updatedUser = {
        DT: {
          username: res.DT.username,
          image: image,
        },
      };
      dispatch(doUpdateUser(updatedUser));
      handleClose();
      toast.success(res.EM);
      setChangePassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res.EM);
    }
  };

  const handleUploadAvatar = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result;
        let imageData = base64String.split(",")[1];

        setPreview(base64String);
        setImage(imageData);
        setImageFile(e.target.files[0]);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("updateProfile.tilte1")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile-container">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <div className="user-avatar">
                            {preview ? (
                              <img src={preview} alt="User Avatar" />
                            ) : (
                              <span>Please choose photo...</span>
                            )}
                          </div>
                        </div>
                        <h5 className="user-name">{user.username}</h5>
                        <h6 className="user-email">{user.email}</h6>
                      </div>
                      <label
                        className="form-label upload"
                        htmlFor="inputUpload"
                      >
                        <FcSwitchCamera
                          size={"33px"}
                          //   style={{ marginRight: "8px" }}
                        />
                      </label>
                      <input
                        id="inputUpload"
                        type="file"
                        hidden
                        onChange={(e) => handleUploadAvatar(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <Form>
                      <Form.Group className="row gutters">
                        <Form.Label
                          htmlFor="fullName"
                          className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                        >
                          {t("updateProfile.tilte2")}
                        </Form.Label>
                        <div className="col-xl-9 col-lg-9 col-md-9">
                          <Form.Control
                            type="text"
                            id="fullName"
                            placeholder={t("updateProfile.tilte9")}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="row gutters">
                        <Form.Label
                          htmlFor="eMail"
                          className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                        >
                          {t("updateProfile.tilte3")}
                        </Form.Label>
                        <div className="col-xl-9 col-lg-9 col-md-9">
                          <Form.Control
                            className="input-email"
                            disabled={true}
                            type="email"
                            id="eMail"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </Form.Group>

                      <Form.Group className="row gutters">
                        <Form.Label className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                          {t("updateProfile.tilte4")}
                        </Form.Label>
                        <div className="col-xl-9 col-lg-9 col-md-9">
                          <Form.Control
                            className="input-role"
                            disabled={true}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </div>
                      </Form.Group>

                      {/* change password */}

                      <Form.Group className="row gutters">
                        <Form.Check
                          type="checkbox"
                          label={t("updateProfile.tilte5")}
                          className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 checkbox-pass"
                          checked={changePassword}
                          onChange={(e) => setChangePassword(e.target.checked)}
                        />
                        <div className="col-xl-9 col-lg-9 col-md-9"></div>
                      </Form.Group>

                      {changePassword && (
                        <>
                          <Form.Group className="row gutters">
                            <Form.Label
                              htmlFor="currentPassword"
                              className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                            >
                              {t("updateProfile.tilte6")}
                            </Form.Label>
                            <div className="col-xl-9 col-lg-9 col-md-9">
                              <Form.Control
                                type="password"
                                id="currentPassword"
                                placeholder={t("updateProfile.tilte10")}
                                value={currentPassword}
                                onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="row gutters">
                            <Form.Label
                              htmlFor="newPassword"
                              className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                            >
                              {t("updateProfile.tilte7")}
                            </Form.Label>
                            <div className="col-xl-9 col-lg-9 col-md-9">
                              <Form.Control
                                type="password"
                                id="newPassword"
                                placeholder={t("updateProfile.tilte11")}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="row gutters">
                            <Form.Label
                              htmlFor="confirmPassword"
                              className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12"
                            >
                              {t("updateProfile.tilte8")}
                            </Form.Label>
                            <div className="col-xl-9 col-lg-9 col-md-9">
                              <Form.Control
                                type="password"
                                id="confirmPassword"
                                placeholder={t("updateProfile.tilte12")}
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </div>
                          </Form.Group>
                        </>
                      )}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("updateProfile.close")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSaveChanges();
            }}
          >
            {t("updateProfile.save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProfile;
