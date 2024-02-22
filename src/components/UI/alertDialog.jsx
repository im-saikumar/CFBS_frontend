import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const AlertDialog = ({ open, setOpen, text }) => {
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    bgcolor: "background.paper",
    borderRadius : 1,
    boxShadow: 24,
    p: 4,
    textAlign: "center"
  };

  const handleClose = () => setOpen(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    // <Button onClick={handleOpen}>Open modal</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            {capitalizeFirstLetter(text)}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography> */}
        </Box><br/>
        <button onClick={handleClose} className="button_okay">okay</button>
      </Box>
    </Modal>
  );
};

export default AlertDialog;
