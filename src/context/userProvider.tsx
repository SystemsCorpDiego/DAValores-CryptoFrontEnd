import { ReactNode, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import * as locales from "@mui/material/locale";
import { UserContext } from "./userContext";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const pageSizeOptions = [50, 75, 100];
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 50,
    page: 0,
  });
  const localSet = "esES" as keyof typeof locales;
  const theme = useTheme();
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[localSet]),
    [localSet, theme],
  );
  const [sessionVersion, setSessionVersion] = useState(0);

  const triggerSessionRefresh = () => {
    setSessionVersion((prev) => prev + 1);
  };

  return (
    <UserContext.Provider
      value={{
        paginationModel,
        setPaginationModel,
        pageSizeOptions,
        localSet,
        themeWithLocale,
        sessionVersion,
        triggerSessionRefresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
