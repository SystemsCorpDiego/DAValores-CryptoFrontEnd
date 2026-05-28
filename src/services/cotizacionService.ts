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

export async function getCotizacion(
  request: CotizacionRequest,
): Promise<Cotizacion> {
  const session = getSession();
  const config = {
    headers: {
      Authorization: `Bearer YOUR_TOKEN_HERE`,
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post<Cotizacion>(
    `${API_URL}/providers/cotizar`,
    request,
    config,
  );
  return data;
}
