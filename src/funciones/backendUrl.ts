export const backendUrl = (): string => {
  try {
    let BACKEND_URL: string = "";
    let sDominio: string = "";

    // IE Polyfill
    if (!window.location.origin) {
      console.log("backendUrl - !window.location.origin");
      sDominio =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
      console.log("backendUrl - sDominio: ", sDominio);
    } else {
      sDominio = window.location.origin;
      console.log("backendUrl - ELSE => sDominio: ", sDominio);
    }

    console.log(
      "backendUrl - ELSE => import.meta.env.VITE_BACKEND_URL: ",
      import.meta.env.VITE_URL_BACKEND,
    );
    BACKEND_URL = sDominio + import.meta.env.VITE_URL_BACKEND;

    console.log("backendUrl - BACKEND_URL: ", BACKEND_URL);

    if (import.meta.env.VITE_URL_BACKEND_ES_LOCALHOST === "1") {
      BACKEND_URL = import.meta.env.VITE_URL_BACKEND as string;
      console.log(
        "backendUrl - VITE_URL_BACKEND_ES_LOCALHOST - BACKEND_URL: ",
        BACKEND_URL,
      );
    }

    console.log("backendUrl - fin - BACKEND_URL: ", BACKEND_URL);
    return BACKEND_URL;
  } catch (error) {
    return "ERROR-BACKEND_URL";
  }
};

export default backendUrl;
