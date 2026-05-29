import oAxios from "@/components/axiosInstace";

//const API_URL = import.meta.env.VITE_URL_BACKEND;

export interface Moneda {
  codigo: string;
  descripcion: string;
}
//`${API_URL}/providers/monedas`
export async function getMonedas(): Promise<Moneda[]> {
  const { data } = await oAxios.get<Moneda[]>("/providers/monedas");
  return data;
}
