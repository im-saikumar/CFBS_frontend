import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useNavigate } from "react-router";

export default function NotsigninDrawer({ open = false, setOpen }) {
  const navigate = useNavigate()
  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(false)}
      >
        <Box mt={3} sx={{ width: "100%", height: "50vh" }} role="presentation">
          <Box sx={{ paddingRight: "50px" }} textAlign={"center"}>
            <p className="sub-heading font-800 center">
              Sign in or Create new account
            </p>
            <br />
            <br />  
            <button onClick={()=>navigate('/signin')} className="button">sign in</button>
            <button onClick={()=>navigate('/signup')} className="button">sign up</button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
