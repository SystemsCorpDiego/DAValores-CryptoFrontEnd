import { useState, useEffect, useRef, ReactNode } from "react";
import { Moneda, getMonedas } from "@/services/monedaCryptoService";
import {
  CotizacionRequest,
  Cotizacion,
  getCotizacion,
} from "@/services/cotizacionService";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export const RipioWidget = () => {
  interface CotiMone {
    moneda: Moneda;
    cotizacion: Cotizacion | null;
  }

  const [lstCotizaciones, setLstCotizaciones] = useState<CotiMone[]>([]);
  const lstCotizacionesRef = useRef<CotiMone[]>([]);
  const [importes, setImportes] = useState<Record<string, string>>({});

  // Mantiene el ref sincronizado con el estado
  useEffect(() => {
    lstCotizacionesRef.current = lstCotizaciones;
  }, [lstCotizaciones]);

  useEffect(() => {
    const ObtenerMonedas = async () => {
      const monedas: Moneda[] = await getMonedas();

      let regCoti: CotiMone;
      let lstAuxCoti: CotiMone[] = [];
      monedas?.forEach((reg) => {
        regCoti = { moneda: reg, cotizacion: null };
        console.log("forEach() => regCoti: " + JSON.stringify(regCoti));

        lstAuxCoti = [...lstAuxCoti, regCoti];
        console.log("forEach() => lstAuxCoti: " + JSON.stringify(lstAuxCoti));
      });
      console.log("*** lstAuxCoti: " + JSON.stringify(lstAuxCoti));
      setLstCotizaciones(lstAuxCoti);
    };
    ObtenerMonedas();
  }, []);

  function debeActualizar(coti: CotiMone): Boolean {
    if (!coti.cotizacion) return true;
    console.log(
      "debeActualizar() - coti.cotizacion.expira: ",
      coti.cotizacion.expira,
    );
    const dateExpira: Date = new Date(coti.cotizacion.expira);
    console.log("debeActualizar() - date: ", dateExpira.toISOString());

    const dateNow = new Date();
    const isoString = dateNow.toISOString();
    console.log("debeActualizar() - dateNow: ", dateNow.toISOString());

    if (dateExpira < dateNow) {
      console.log(
        "debeActualizar() - dateExpira MENOR - ACTUALIZAR TRUE ** !!",
      );
      return true;
    } else {
      console.log("debeActualizar() - dateExpira MAYOR - ACTUALIZAR FALSE");
    }

    console.log(isoString);

    return false;
  }

  //http://localhost:5173/#/ripioWidget
  useEffect(() => {
    const ActualizarCotizacion = (dato: Cotizacion) => {
      console.log("ActualizarCotizacion - dato: ", dato);
      setLstCotizaciones((prev) =>
        prev.map((reg) =>
          reg.moneda.codigo === dato.activoBase
            ? { moneda: reg.moneda, cotizacion: dato }
            : reg,
        ),
      );
    };

    const ObtenerCotizacion = async (reg: CotiMone) => {
      console.log("ObtenerCotizacion - INIT");
      const request: CotizacionRequest = {
        activoBase: reg.moneda.codigo,
        activoCoti: "ARS",
      };
      console.log("ObtenerCotizacion - request: ", request);
      const cotizacionAux = await getCotizacion(request);
      console.log("ObtenerCotizacion - cotizacionAux: ", cotizacionAux);
      ActualizarCotizacion(cotizacionAux);
      console.log("ObtenerCotizacion - FIN");
    };

    const intervalId = setInterval(() => {
      const current = lstCotizacionesRef.current;
      console.log("setInterval - lstCotizaciones: ", current);

      if (current.some((reg) => debeActualizar(reg))) {
        current.forEach((reg) => {
          console.log("setInterval - reg: ", reg);
          if (debeActualizar(reg)) {
            ObtenerCotizacion(reg);
          }
        });
      } else {
        console.log("setInterval - ningún registro requiere actualización");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // corre una sola vez — lee datos frescos via ref

  const handleComprar = (item: CotiMone) => {
    const importe = parseFloat(importes[item.moneda.codigo] ?? "0");
    console.log(
      "handleComprar - moneda:",
      item.moneda.codigo,
      "importe:",
      importe,
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Ripio Widget
      </Typography>

      <Grid container spacing={2}>
        {lstCotizaciones.map((item) => (
          <Grid key={item.moneda.codigo} size={{ xs: 12, sm: 12, md: 12 }}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }} variant="h5">
                    {item.moneda.codigo}
                  </Typography>
                  <Chip
                    label={item.cotizacion ? "Activo" : "Cargando..."}
                    color={item.cotizacion ? "success" : "default"}
                    size="small"
                  />
                </Box>

                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  {item.moneda.descripcion}
                </Typography>

                <Divider sx={{ my: 1 }} />

                {item.cotizacion ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                  >
                    <Row
                      label={<strong>Activo base</strong>}
                      value={item.cotizacion.activoBase}
                    />
                    <Row
                      label={<strong>Activo cotización</strong>}
                      value={item.cotizacion.activoCoti}
                    />
                    <Divider sx={{ my: 1.5 }} />
                    <Row
                      label={<strong>Compra ratio</strong>}
                      value={item.cotizacion.compraRatio}
                    />
                    <Row
                      label={<strong>Compra comisión</strong>}
                      value={item.cotizacion.compraComision}
                    />
                    <Row
                      label={<strong>Venta ratio</strong>}
                      value={item.cotizacion.ventaRatio}
                    />
                    <Row
                      label={<strong>Venta comisión</strong>}
                      value={item.cotizacion.ventaComision}
                    />
                    <Divider sx={{ my: 1.5 }} />
                    <Row
                      label="Expira"
                      value={new Date(item.cotizacion.expira).toLocaleString()}
                    />
                    <Row label="ID externo" value={item.cotizacion.idExterno} />
                    <Row
                      label="ID externo proveedor"
                      value={item.cotizacion.idExternoProveedor}
                    />

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <TextField
                        label="Importe"
                        type="number"
                        size="small"
                        value={importes[item.moneda.codigo] ?? ""}
                        onChange={(e) => {
                          console.log("onChange - item: ", item);
                          console.log("onChange - importe: ", e.target.value);
                          console.log("onChange - importes: ", importes);
                          setImportes((prev) => ({
                            ...prev,
                            [item.moneda.codigo]: e.target.value,
                          }));
                        }}
                        slotProps={{ htmlInput: { step: "0.01", min: "0" } }}
                        sx={{ width: 180 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleComprar(item)}
                        disabled={!importes[item.moneda.codigo]}
                      >
                        Comprar
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 2 }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Row = ({
  label,
  value,
}: {
  label: ReactNode;
  value: string | number;
}) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="body1" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
      {value}
    </Typography>
  </Box>
);
