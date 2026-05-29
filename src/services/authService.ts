import axios from "axios";
import { cuentaEsco } from "@/funciones/LocalStorageService";

const API_URL = import.meta.env.VITE_URL_BACKEND;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenRefresco: string | null;
  cuentaEsco: cuentaEsco | null;
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
