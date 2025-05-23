import axios from "axios";
import {useEffect} from "react";
import {useAuth} from "~/auth/auth-context";

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
});


export const useAxiosPrivate = () => {
  const {username, token} = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [username, token]);

  return axiosPrivate;
}
