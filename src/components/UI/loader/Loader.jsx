import React from "react";
import styles from "./loader.module.css";
import { Box, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container maxWidth="sm">
      <Box className={styles.loader} m={20} />
    </Container>
  );
};

export default Loader;
