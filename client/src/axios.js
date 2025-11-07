import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials: true
})


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      // Dispatch logout action to clear redux & localStorage
      window.store.dispatch(logout()); // window.store = your redux store reference
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api