import axios from "axios";

const SessionHandler = {
  login: (token: string) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = token;
  },
  logout: () => {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("token");
  },

  isLoggedIn: () => {
    return localStorage.getItem("token") != null;
  },
  init: () => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = token;
    }
  },
};

export default SessionHandler;
