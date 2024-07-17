import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.gplan.in",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === "https://api.gplan.in/auth/token/"
    ) {
      // router.push('/login')
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("retry is false");

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      return axios
        .post("https://api.gplan.in/auth/token/refresh/", {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access);
            originalRequest.headers["Authorization"] =
              "Bearer " + localStorage.getItem("access_token");
            console.log(originalRequest);
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
