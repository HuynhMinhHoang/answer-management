import { useEffect, useState } from "react";
import "./ManageQuizz.scss";
import "sweetalert2/src/sweetalert2.scss";
import ModalCRUDQuizz from "./ModalCRUDQuizz";
import TableListQuizz from "./TableListQuizz";
import { getListQuizz } from "../../../../services/APIService";

const ManageQuizz = () => {
  const [dataQuizzEdit, setDataQuizzEdit] = useState();

  const [listQuizz, setListQuizz] = useState([]);

  const fetchListQuizz = async () => {
    try {
      let res = await getListQuizz();
      setListQuizz(res.DT);
      // console.log("quizz", res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchListQuizz();
  }, []);

  return (
    <div className="manage-qizz-container">
      <div className="add-quizz">
        <div className="title">Add New Quizz</div>
        <p>Use the form below to add or update quizz information.</p>
        <ModalCRUDQuizz
          dataQuizzEdit={dataQuizzEdit}
          fetchListQuizz={fetchListQuizz}
          setDataQuizzEdit={setDataQuizzEdit}
        />
      </div>
      <div className="table-quizz">
        <div className="title">Table List Quizz</div>
        <p>
          The table below displays quizz information.
          <code> Click</code> on a quizz to <code> edit</code> their details or
          <code> view</code> their profile picture.
        </p>
        <TableListQuizz
          listQuizz={listQuizz}
          setDataQuizzEdit={setDataQuizzEdit}
          fetchListQuizz={fetchListQuizz}
        />
      </div>
    </div>
  );
};

export default ManageQuizz;
