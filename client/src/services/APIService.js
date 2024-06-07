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
  return axios.post("/api/v1/login", { email: email, password: password });
};

export {
  postCreateNewUser,
  getListUser,
  updateUser,
  deleteUser,
  getListUserPaginate,
  loginUser,
};
