import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const AlertComponent = ({ open, handleClose, message }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={message.severity}
        sx={{ width: "100%" }}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;
