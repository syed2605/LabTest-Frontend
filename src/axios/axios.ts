import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

// const toast = (message: string) => {
//   console.log(message); // Replace with actual toast implementation if available.
// };
interface ResponseInterface extends AxiosResponse  {
    userId?: string
}

let accessToken: string = '';

export const setAccessToken = (token: string) => {
  accessToken = token;
};

const API: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Consider security implications.  Usually needed for refresh token flow.
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Important: Get accessToken *inside* the interceptor.
    accessToken = localStorage.getItem('accessToken') || '';
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    console.log('Using request interceptor');
    return config;
  },
  (error) => {
    console.log('Request error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response: ResponseInterface) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }; //Add _retry to the type

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const userId = localStorage.getItem('userId');
        if (!storedRefreshToken) {
          // Handle case where refresh token is missing (e.g., redirect to login)
          console.error('Refresh token is missing');
          // toast.error("Please login again.");
          return Promise.reject({
            ...error,
            message: "Refresh token is missing",
          }); // Reject with an error, *don't* redirect here.
        }

        const refreshResponse = await axios.post(
          'http://localhost:3000/api/users/refresh',
          {
            "userId": userId,
          },
          {
            headers:{
                "Authorization" : `Bearer ${storedRefreshToken}`
            }, // Use the fetched refresh token
          }
        );

        const newAccessToken = refreshResponse?.data?.data?.accessToken;
        if (!newAccessToken) {
          console.error("New access token not received from refresh request");
          return Promise.reject({
            ...error,
            message: "New access token not received",
          });
        }
        // accessToken = newAccessToken;
        localStorage.setItem('accessToken', newAccessToken);
        setAccessToken(newAccessToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest); // Retry the original request
      } catch (refreshError: any) {
        // toast.error(`Token refresh failed`); // Use provided toast
        console.error('Token refresh failed:', refreshError?.status);
        if(refreshError?.status === 401){
          console.log("error", refreshError)
          const userId = localStorage.getItem('userId');
          await axios.post(
            `http://localhost:3000/api/users/logout/${userId}`,
          );
          localStorage.clear();
          window.location.href = '/login';
        }
        //  localStorage.removeItem('accessToken'); //remove this
        //  localStorage.removeItem('refreshToken');  //and this.  Let the app decide how to handle.
        return Promise.reject(refreshError); // Important: Reject the error!
      }
    }
    return Promise.reject(error);
  }
);

export default API;
