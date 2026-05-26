import axios from "axios";
import { getSession } from "./authService";

const API_URL = import.meta.env.VITE_URL_BACKEND;

export interface CotizacionRequest {
  activoBase: string;
  activoCoti: string;
}

export interface Cotizacion {
  activoBase: string;
  activoCoti: string;
  compraComision: number;
  compraRatio: number;
  expira: string;
  idExterno: string;
  idExternoProveedor: string;
  ventaComision: number;
  ventaRatio: number;
}

export async function getCotizaciones(): Promise<Cotizacion[]> {
  const session = getSession();
  const { data } = await axios.get<Cotizacion[]>(
    `${API_URL}/crypto-providers/cotizar`,
    {
      headers: { Authorization: `Bearer ${session?.token}` },
    },
  );
  return data;
}
