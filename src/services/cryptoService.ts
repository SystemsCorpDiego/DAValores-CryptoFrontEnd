import axios from "axios";
import { getSession } from "./authService";

const API_URL = import.meta.env.VITE_URL_BACKEND;

export interface Moneda {
  codigo: string;
  descripcion: string;
}

export async function getMonedas(): Promise<Moneda[]> {
  const session = getSession();
  const { data } = await axios.get<Moneda[]>(`${API_URL}/crypto/monedas`, {
    headers: { Authorization: `Bearer ${session?.token}` },
  });
  return data;
}
