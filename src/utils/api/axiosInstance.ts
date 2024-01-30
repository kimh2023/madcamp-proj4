import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 30000,
  // httpsAgent: new Agent({
  //   rejectUnauthorized: false,
  //   requestCert: false,
  //   // agent: false,
  // }),
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const agent = new Agent({
    //   rejectUnauthorized: false,
    //   requestCert: false,
    //   // agent: false,
    // });
    config.withCredentials = true;
    // config.httpsAgent = agent;
    // globalAgent.options.rejectUnauthorized = false;
    return config;
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
