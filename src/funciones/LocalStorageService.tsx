const SESSION_KEY = import.meta.env.VITE_SESSION_KEY;

export interface cuentaEsco {
  comitente: string;
  comitenteDescripcion: string;
  cuit: string;
}

export interface SessionState {
  logged: boolean;
  token: string;
  tokenRefresco: string | null;
  username: string;
  cuentaEsco: cuentaEsco | null;
}

export function getSession(): SessionState | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as SessionState) : null;
}

export function saveSession(
  token: string,
  tokenRefresco: string,
  username: string,
  cuentaEsco: cuentaEsco | null,
): void {
  var sessionActual: SessionState | null = getSession();
  if (sessionActual && !cuentaEsco) {
    cuentaEsco = sessionActual.cuentaEsco;
  }
  const session: SessionState = {
    logged: true,
    token,
    tokenRefresco,
    username,
    cuentaEsco,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function saveSessionObject(session: SessionState): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionToken(): string | null {
  var session: SessionState | null = getSession();
  if (session && session.token) return session.token;
  return null;
}

export function getSessionTokenRefresh(): string | null {
  var session: SessionState | null = getSession();
  if (session && session.tokenRefresco) return session.tokenRefresco;
  return null;
}

export const setLoguinRefresh = (token: string, tokenRefresh: string) => {
  try {
    let auxStateLogin: SessionState | null = getSession();

    if (auxStateLogin != null) {
      auxStateLogin.token = token;
      auxStateLogin.tokenRefresco = tokenRefresh;

      localStorage.setItem("stateLogin", JSON.stringify(auxStateLogin));
    }
  } catch (error) {}
};

const localStorageService = {
  getSession: function () {
    return getSession();
  },
  getSessionToken: function () {
    return getSessionToken();
  },
  getSessionTokenRefresh: function () {
    return getSessionTokenRefresh();
  },
  clearSession: function () {
    clearSession();
  },
  saveSession: function (
    token: string,
    tokenRefresco: string,
    username: string,
    cuentaEsco: cuentaEsco | null,
  ) {
    saveSession(token, tokenRefresco, username, cuentaEsco);
  },
  setLoguinRefresh: function (token: string, tokenRefresh: string) {
    setLoguinRefresh(token, tokenRefresh);
  },
};

export default localStorageService;
