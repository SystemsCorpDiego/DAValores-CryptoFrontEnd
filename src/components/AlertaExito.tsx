import { Alert, Box, Fade } from '@mui/material';

interface AlertaExitoProps {
  open: boolean;
  onClose: () => void;
}

export default function AlertaExito({ open, onClose }: AlertaExitoProps) {
  return (
    <Fade in={open} unmountOnExit>
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.45)',
          borderRadius: 'inherit',
          zIndex: 1,
        }}
      >
        <Alert onClose={onClose} severity="success" variant="filled" sx={{ minWidth: 260 }}>
          ¡Operación realizada con éxito!
        </Alert>
      </Box>
    </Fade>
  );
}