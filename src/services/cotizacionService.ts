import oAxios from "@/components/axiosInstace";

//const API_URL = import.meta.env.VITE_URL_BACKEND;

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
  //console.log(`getCotizacion - URL : ${API_URL}/providers/cotizar`);

  //`${API_URL}/providers/cotizar`
  const { data } = await oAxios.post<Cotizacion>("/providers/cotizar", request);
  return data;
}
