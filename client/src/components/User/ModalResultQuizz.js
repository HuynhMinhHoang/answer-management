import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResultQuizz = (props) => {
  const { show, handleClose, dataModalResult, setIsShowAnswer, isShowAnswer } =
    props;

  const handleShowAnswer = () => {
    setIsShowAnswer(true);
    handleClose();
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Results of the quiz</Modal.Title>
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
        <Button
          variant="primary"
          onClick={() => {
            handleShowAnswer();
          }}
        >
          Show answer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalResultQuizz;
