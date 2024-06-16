import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResultQuizz = ({ show, handleClose, dataModalResult }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Test results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Total questions: <b>{dataModalResult?.countTotal}</b>
        </div>
        <div>
          Total correct answer: <b>{dataModalResult?.countCorrect}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary">Understood</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResultQuizz;
