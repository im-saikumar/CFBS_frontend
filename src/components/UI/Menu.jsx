import { Box, Container, useMediaQuery } from "@mui/material";
import React from "react";
import SideMenu from "./sideMenu";

const Menu = ({search, setSearch}) => {
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <>
      {matches && (
        <Container maxWidth="xs" style={{padding: 0}}>
          <Box position={"fixed"} style={{ marginTop: 8 }}>
            <SideMenu search={search} setSearch={setSearch}/>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Menu;
