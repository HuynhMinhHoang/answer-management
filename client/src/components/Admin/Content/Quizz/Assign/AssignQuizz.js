import React, { useEffect, useState } from "react";
import "./AssignQuizz.scss";
import Select from "react-select";
import {
  getListQuizz as fetchListQuizz,
  getListUser as fetchListUser,
} from "../../../../../services/APIService";

const AssignQuizz = () => {
  const [listQuizz, setListQuizz] = useState([]);
  const [listUser, setListUser] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [selectedQuizz, setSelectedQuizz] = useState({});

  const fetchQuizzes = async () => {
    try {
      let res = await fetchListQuizz();
      let newQuizz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuizz(newQuizz);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    try {
      let res = await fetchListUser();
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} --- ${item.username} [${item.email}]`,
        };
      });
      setListUser(newUser);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    fetchUsers();
  }, []);

  return (
    <>
      <div className="manage-assign-container">
        <div className="title">Assign Quizz To User</div>

        <div className="add-assign">
          <div className="bg-select-question">
            <label>Select Quizzes</label>
            <Select
              options={listQuizz}
              defaultValue={selectedQuizz}
              onChange={setSelectedQuizz}
              classNamePrefix="react-select"
            />
          </div>

          <div className="bg-select-question">
            <label>Select Users</label>
            <Select
              options={listUser}
              defaultValue={selectedUser}
              onChange={setSelectedUser}
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div className="bg-btnSave">
          <button
            type="button"
            className="btn-save"
            // onClick={handleCreateQuestionForQuizz}
          >
            Accept Assign
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignQuizz;
