import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalViewImage.scss";

const ModalViewImage = ({ dataImageUser, openModal, closeModal }) => {
  return (
    <>
      <Modal
        onHide={closeModal}
        show={openModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>User Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataImageUser ? (
            <img
              src={`data:image/jpeg;base64,${dataImageUser}`}
              alt="User Avatar"
              className="img"
            />
          ) : (
            <div className="no-avt">No avatar...</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewImage;
