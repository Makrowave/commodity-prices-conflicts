import axios from "axios";
import {useEffect} from "react";
import {useAuth} from "~/auth/auth-context";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const useAxiosPrivate = () => {
  const {username, token, logout} = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => (response),
      (error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [username, token]);

  return axiosPrivate;
}
