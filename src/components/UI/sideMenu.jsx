import { Box, Grid, InputAdornment, TextField, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SearchIcon from '@mui/icons-material/Search';
import {loginDetails, notificationsCount, userDetails} from '../loginDetails'
import { googleLogout } from '@react-oauth/google';
import ConfirmModal from "./confirmModal";

const SideMenu = ({search, setSearch}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const searchVisibilty = (pathname === "/" || pathname === "/clearedissues")

  function signOut(){
    setConfirmOpen(false)
    localStorage.removeItem('userDetails');
    window.location.pathname = '/signin'
  }

  const [confirmOpen, setConfirmOpen] = useState(false);

  const login  = loginDetails.login

  const [notificationDetails, setNotificationDetails] = useState([]);
  const matches = useMediaQuery('(min-width:900px)');


  useEffect(()=>{
   login && matches && fetch(`${process.env.REACT_APP_API}/get_notifications?email=${userDetails.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(data => {
        const filterData = data.filter(e => e.read === false)
        setNotificationDetails(filterData)
      })
      .catch((err) => console.log(err));
  },[login, matches])  
  
  return (
    <Grid>
      <Box textAlign={"left"} width={"250px"}>
      <Box
        textAlign={"center"}
        width={"100%"}
        borderRadius={"2px"}
        p={1}
        bgcolor={"black"}
        color={"white"}
        sx={{
          cursor: "pointer",
        }}
      >
        Menu
      </Box>
        {searchVisibilty && 
        <TextField 
          size="small" 
          id="standard-basic" 
          fullWidth  
          placeholder="Search by location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FmdGoodIcon className="font-black" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end" sx={{cursor: "pointer"}}>
                <SearchIcon className="font-black" />
              </InputAdornment>
            ),
          }}
        sx={{paddingTop: "10px", height: "45px",}}
        />}
        {login && 
        <Box
        onClick ={() => navigate("/notifications")} 
        sx={{cursor: "pointer", borderBottom : "1px solid #000000", padding: "15px 5px"}}>
            Notifications 
            {notificationDetails.length > 0 &&<span 
            style={{ display: "inline-flex",
              backgroundColor: "red", 
              height: "20px", 
              width: "20px", 
              borderRadius: "50%",
              justifyContent: "center",
              marginLeft:15,
              color: "white"
            }}>{notificationDetails.length}</span>}
        </Box>}
        <Box
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Home
        </Box>
        <Box
          onClick={() => navigate("/clearedissues")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #000000", padding: "15px 5px"
          }}
        >
          Cleared issues
        </Box>
        {login && <Box
          onClick={() => navigate("/profile")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Profile
        </Box>}
        {login && <Box
          onClick={() => navigate("/saved")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Saved
        </Box>}
        {login && <Box
          onClick={() => navigate("/articles")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #000000", padding: "15px 5px"
          }}
        >
          My Articles
        </Box>}
        <Box
          onClick={() => navigate("/about")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          About
        </Box>
        <Box
          onClick={() => navigate("/contact")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Contact us
        </Box>
        {login && <Box
          onClick={() => setConfirmOpen(true)}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Sign out
        </Box>}
      </Box>
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={() => {googleLogout(); signOut()}}>Are you sure to sign out?</ConfirmModal>
    </Grid>
  );
};

export default SideMenu;
