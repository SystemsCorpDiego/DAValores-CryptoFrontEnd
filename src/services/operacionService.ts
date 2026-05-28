import axios from "axios";
import { getSession } from "./authService";

const API_URL = import.meta.env.VITE_URL_BACKEND;

export interface OperacionRequest {
  tipo: string;
  idExternoProveedorCotizacion: string;
  cantidad: number;
}
