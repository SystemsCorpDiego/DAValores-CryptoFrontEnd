import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenRefresco: string | null;
}

export const SESSION_KEY = "stateLogin";

export interface SessionState {
  logged: boolean;
  token: string;
  tokenRefresco: string | null;
  username: string;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const encoded = btoa(`${credentials.username}:${credentials.password}`);
  const { data } = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    null,
    {
      headers: {
        Authorization: `Basic ${encoded}`,
      },
    },
  );
  return data;
}

export function saveSession(
  token: string,
  tokenRefresco: string,
  username: string,
): void {
  const session: SessionState = {
    logged: true,
    token,
    tokenRefresco,
    username,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function verify2FA(
  token: string,
  codigo: string,
): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(
    `${API_URL}/auth/login/2fa`,
    { codigo },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): SessionState | null {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as SessionState) : null;
}
