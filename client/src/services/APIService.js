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

export { postCreateNewUser, getListUser };
