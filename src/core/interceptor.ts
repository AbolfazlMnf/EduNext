import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { toast } from "sonner";

const httpClient = axios.create({
  baseURL: "/api",
});

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

httpClient.interceptors.request.use(
  (config) => {
    // check token
    const token = getCookie("accessToken");

    // set header if we have token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 403) {
      toast.error("dont have the access needed");
      window.location.href = "/";
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      // ready for refreshing
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getCookie("refreshToken");
      // if we dont have refreshToken
      if (!refreshToken) {
        deleteCookie("accessToken");
        toast.error("sign in again");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
          {
            refreshToken,
          },
        );

        const newAccessToken = res.data.accessToken;

        setCookie("accessToken", newAccessToken);

        httpClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return httpClient(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        toast.error("please login again ");
        window.location.href = "/auth/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
