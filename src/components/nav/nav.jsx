import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginDetails} from './../../components/loginDetails'
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileMenu from "../UI/mobileMenu";


const Navbar = ({setSearch}) => {
  
  const login  = loginDetails.login
  const navigation = useNavigate()
  const matches = useMediaQuery('(min-width:900px)');
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="flex center"
      style={{
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "0 30px",
        height: "50px",
        border: "1px solid #e2e2e2",
        backgroundColor: "#ffffff90",
        backdropFilter: "blur(30px)",
        borderStyle: "hidden hidden solid hidden",
        position: "fixed",
        zIndex: 100,
        width: "100%",
        top: 0,
      }}
    >
      <div className="center flex">
      {!matches && <MenuIcon onClick={()=>setOpen(true)} fontSize="large"/>}
      <Link className="link" to={'/'}><div className="font-800 medium">C.F.B.S</div></Link>
      </div>
      <div className="center flex">
        {matches && !login && <button onClick={()=> navigation('/signin')} className="button">sign in</button>}
        {/* {matches && !login && <button onClick={()=> navigation('/signup')} className="button">sign up</button>} */}
        {login && <button onClick={()=> navigation('/create')} className="button">write</button>}       
      </div>
      <MobileMenu open={open} setOpen={setOpen} setSearch={setSearch}/>
    </nav>
  );
};

export default Navbar;
