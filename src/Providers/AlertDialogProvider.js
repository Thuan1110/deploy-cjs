import { Alert, Snackbar } from "@mui/material";
import { createContext, useMemo, useState } from "react";

export const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [isOpen, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const alertContextValue = useMemo(
    () => ({ isOpen, setOpenAlert, message, setMessage, setSeverity }),
    [isOpen, message]
  );

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <AlertContext.Provider value={alertContextValue}>
      {children}

      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
