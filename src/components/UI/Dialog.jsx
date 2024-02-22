import * as React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, TextField } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ResponsiveDialog({ setOpenLink, openLink = false, children}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpenLink(false);
  };

  const [copied, setCopied] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(children).then(() => setCopied(true));
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openLink}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Share Link"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box width={"50vh"}>
              <TextField
                fullWidth
                type="text"
                value={children}
                color="info"
                focused
                sx={{
                  margin: "0 0 10px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: 'black',
                      border: 1
                    }
                  }
                }}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingRight : "20px"}}>
          <CopyToClipboard text={children}>
            <button onClick={handleClick} className="button">
              {copied ? "Copied!" : "Copy"}
            </button>
          </CopyToClipboard>
          <button className="button" onClick={handleClose}>
            Done
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
