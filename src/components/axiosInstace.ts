import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import localStorageService from "@/funciones/LocalStorageService";
import backendUrl from "@/funciones/backendUrl";

const FRONTEND_LOGIN_URL = import.meta.env.VITE_URL_FRONTEND_LOGIN as string;

const BACKEND_URL = backendUrl();
const oAxios = axios.create({
  baseURL: BACKEND_URL,
  timeout: 60000,
});

oAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
oAxios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin";
oAxios.defaults.headers.common["Content-Type"] = "application/json";

oAxios.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    req.headers.Authorization =
      "Bearer " + localStorageService.getSessionToken();
    return req;
  },
  (error: AxiosError) => {
    console.log(
      `** oAxios.interceptors - REQUEST - ERROR - error: ${JSON.stringify(error)}`,
    );
    return Promise.reject(error);
  },
);

oAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: InternalAxiosRequestConfig | undefined =
      error.config;
    console.log(
      `** oAxios.interc - RESPONSE - ERROR - error: ${JSON.stringify(error)}`,
    );
    console.log("originalRequest:", originalRequest);

    if (error.response) {
      if (error.response.status === 401) {
        console.log("** oAxios.interc - HTTP-ERROR 401 - ERROR AUTH ");
        const refreshed = await execTokenRefresh();
        console.log("execTokenRefresh - rta:", refreshed);
        if (refreshed && originalRequest) {
          const rta = await execOriginalRequest(originalRequest);
          console.log("execOriginalRequest - rta:", rta);
          return rta;
        }
        console.log("oAxios.interc - GO LOGIN");
        window.location.href = FRONTEND_LOGIN_URL;
        return error;
      }

      if (error.response.status === 404) {
        console.log("** oAxios.interc - RESPONSE - HTTP_ERROR 404");
        const url = (error.response.config as InternalAxiosRequestConfig).url;
        if (url) {
          console.log(
            "- URL INCORRECTA: " +
              url +
              ". verificar que el Backend este activo",
          );
        }
      }

      if (error.response.data) {
        console.log(
          "** oAxios.interc - RESPONSE - HTTP - oJsonResponse:" +
            JSON.stringify(error.response.data),
        );
      }
    }

    console.log("*** Promise.reject(error) - OJOOO !!! ");
    return Promise.reject(error);
  },
);

const execTokenRefresh = async (): Promise<boolean> => {
  const tokenRefresh = localStorageService.getSessionTokenRefresh();
  console.log("execTokenRefresh() - tokenRefresh:", tokenRefresh);
  if (!tokenRefresh) return false;

  console.log("execTokenRefresh() - BACKEND_URL:", BACKEND_URL);

  return oAxios
    .post(
      "/auth/login/token/refresh",
      JSON.stringify({ tokenRefresco: tokenRefresh }),
    )
    .then((response: AxiosResponse) => {
      console.log("token/refresh - response:", response);
      localStorageService.setLoguinRefresh(
        response.data.token,
        response.data.tokenRefresco,
      );
      return true;
    })
    .catch((err: AxiosError) => {
      console.log("token/refresh - ERROR");
      console.log(err);
      console.log(
        "** oAxios.interc - execTokenRefresh(): ERROR - VOY AL LOGUIN",
      );
      window.location.href = FRONTEND_LOGIN_URL;
      return false;
    });
};

const execOriginalRequest = async (
  originalRequest: InternalAxiosRequestConfig,
): Promise<AxiosResponse | false> => {
  return oAxios(originalRequest)
    .then((response: AxiosResponse) => response)
    .catch((error: AxiosError) => {
      console.log(error);
      return false;
    });
};

export default oAxios;
