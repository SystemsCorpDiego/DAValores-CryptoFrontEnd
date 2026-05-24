import { createContext, Dispatch, SetStateAction } from "react";
import { Theme } from "@mui/material/styles";

export interface PaginationModel {
  pageSize: number;
  page: number;
}

export interface UserContextType {
  paginationModel: PaginationModel;
  setPaginationModel: Dispatch<SetStateAction<PaginationModel>>;
  pageSizeOptions: number[];
  localSet: string;
  themeWithLocale: Theme;
  sessionVersion: number;
  triggerSessionRefresh: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
