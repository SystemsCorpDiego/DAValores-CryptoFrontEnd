import { Alert, Box, Divider, Fade, Typography } from "@mui/material";
import { Operacion } from "@/services/operacionService";

interface AlertaExitoProps {
  open: boolean;
  onClose: () => void;
  operacion: Operacion | null;
}

const Field = ({ label, value }: { label: string; value: string | number }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
    <Typography variant="body2" sx={{ opacity: 0.85 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
      {value}
    </Typography>
  </Box>
);

export default function AlertaExitoOperacion({
  open,
  onClose,
  operacion,
}: AlertaExitoProps) {
  return (
    <Fade in={open} unmountOnExit>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.45)",
          borderRadius: "inherit",
          zIndex: 1,
        }}
      >
        <Alert
          onClose={onClose}
          severity="success"
          variant="filled"
          sx={{ minWidth: 300 }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
            ¡Operación realizada con éxito!
          </Typography>
          <Divider sx={{ mb: 1, borderColor: "rgba(255,255,255,0.4)" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Field label="Tipo" value={operacion?.tipo ?? ""} />
            <Field label="Activo base" value={operacion?.activoBase ?? ""} />
            <Field
              label="Cantidad base"
              value={operacion?.activoBaseCantidad ?? ""}
            />
            <Field
              label="Activo cotización"
              value={operacion?.activoCoti ?? ""}
            />
            <Field
              label="Cantidad cotización"
              value={operacion?.activoCotiCantidad ?? ""}
            />
            <Field label="Ratio" value={operacion?.ratio ?? ""} />
          </Box>
        </Alert>
      </Box>
    </Fade>
  );
}
