export const backendUrl = (): string => {
  try {
    let BACKEND_URL: string = "";

    // IE Polyfill
    if (!window.location.origin) {
      BACKEND_URL =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    } else {
      BACKEND_URL = window.location.origin;
    }

    BACKEND_URL = BACKEND_URL + import.meta.env.VITE_BACKEND_URL;

    if (import.meta.env.VITE_ES_LOCALHOST === "1") {
      BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
    }

    return BACKEND_URL;
  } catch (error) {
    return "ERROR-BACKEND_URL";
  }
};

export default backendUrl;
