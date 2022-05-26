import axios from "axios";

const cadastro = (usuario) => {
  return axios.post("/usuarios", usuario);
};

const login = (usuario) => {
  return axios
    .post("/login", usuario)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    })
    .catch(() => {
      return "Login failed";
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  return ''; //JSON.parse(localStorage.getItem("user"));
};

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const AuthService = {
  cadastro,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};

export default AuthService;
