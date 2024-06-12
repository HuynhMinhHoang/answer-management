import axios from "../../src/utils/axiosConfig";

const postCreateNewUser = (email, username, password, role, avatar) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("role", role);
  formData.append("userImage", avatar);
  return axios.post("/api/v1/participant", formData);
};

const getListUser = () => {
  return axios.get("/api/v1/participant/all");
};

const updateUser = (id, username, role, avatar) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("username", username);
  formData.append("role", role);
  formData.append("userImage", avatar);
  return axios.put("/api/v1/participant", formData);
};

const deleteUser = (id) => {
  return axios.delete("/api/v1/participant/", { data: { id: id } });
};

const getListUserPaginate = (page, limit) => {
  return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const loginUser = (email, password) => {
  return axios.post("/api/v1/login", {
    email: email,
    password: password,
    delay: 4000,
  });
};

const registerUser = (email, username, password) => {
  return axios.post("/api/v1/register", {
    email: email,
    username: username,
    password: password,
    delay: 4000,
  });
};

const getQuizzByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

const getDetailQuizzById = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const submitQuizzFinish = (payload) => {
  return axios.post("/api/v1/quiz-submit", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createNewQuizz = (description, name, difficulty, quizImage) => {
  const formData = new FormData();
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  return axios.post("/api/v1/quiz", formData);
};

const getListQuizz = () => {
  return axios.get("/api/v1/quiz/all");
};

const updateQuizz = (id, description, name, difficulty, quizImage) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("description", description);
  formData.append("name", name);
  formData.append("difficulty", difficulty);
  formData.append("quizImage", quizImage);
  return axios.put("/api/v1/quiz", formData);
};

const deleteQuizz = (id) => {
  return axios.delete(`/api/v1/quiz/${id}`);
};

const createNewQuestionForQuizz = (quiz_id, description, questionImage) => {
  const formData = new FormData();
  formData.append("quiz_id", quiz_id);
  formData.append("description", description);
  formData.append("questionImage", questionImage);
  return axios.post("/api/v1/question", formData);
};

const createNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("/api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

export {
  postCreateNewUser,
  getListUser,
  updateUser,
  deleteUser,
  getListUserPaginate,
  loginUser,
  registerUser,
  getQuizzByUser,
  getDetailQuizzById,
  submitQuizzFinish,
  createNewQuizz,
  getListQuizz,
  updateQuizz,
  deleteQuizz,
  createNewQuestionForQuizz,
  createNewAnswerForQuestion,
};
