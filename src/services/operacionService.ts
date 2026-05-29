import oAxios from "@/components/axiosInstace";

const API_URL = import.meta.env.VITE_URL_BACKEND;

export interface OperacionRequest {
  tipo: string;
  idExternoProveedorCotizacion: string;
  cantidad: number;
}

export interface Operacion {
  activoBase: string;
  activoBaseCantidad: number;
  activoCoti: string;
  activoCotiCantidad: number;
  ratio: number;
  tipo: string;
}

export async function getOperacion(
  request: OperacionRequest,
): Promise<Operacion> {
  const urlTipoOpe: string = request.tipo == "COMPRA" ? "compra" : "venta";

  //`${API_URL}/providers/operacion/${urlTipoOpe}`
  const { data } = await oAxios.post<Operacion>(
    `/providers/operacion/${urlTipoOpe}`,
    request,
  );
  return data;
}
