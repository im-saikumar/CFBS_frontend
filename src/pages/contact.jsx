import { Box, Container, Divider, Grid, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import Menu from "../components/UI/Menu";
import AlertDialog from "../components/UI/alertDialog";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  function submithandler(e) {
    e.preventDefault();
    const { name, mobile, email, message } = e.target;

    fetch(`${process.env.REACT_APP_API}/contact_us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        message: message.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertOpen(true);
        setTextAlert(data.message);
      })
      .catch((err) => console.log(err))
      .finally(() => e.target.reset());
  }

  return (
    <Grid mt={8} mb={5} container item marginX={1} className="flex">

      <Helmet>
        <title>CFBS - Contact us</title>
        <meta name="title" content="Contact us" />
        <meta
          name="details"
          content="We believe in the power of collective action to create a stronger, more equitable India for all. We welcome your ideas, feedback, and support as we work towards this shared vision"
        />
      </Helmet>

      <Grid container md={8} item display={"block"}>        
      <Container maxWidth="sm">
          <p className="heading font-900">Cause For Better Society</p>
          <br />
          <Divider />
          <br />
          <p className="sub-heading font-800">Contact Us :</p>
          <br />
          <p className="medium font-600" style={{ marginBottom: "8px" }}>
            Cause For Better Society, Together
          </p>
          <p
            className="font-Nota text-justified font-500"
            style={{ fontStyle: "italic" }}
          >
            We believe in the power of collective action to create a stronger,
            more equitable India for all. We welcome your ideas, feedback, and
            support as we work towards this shared vision.
          </p>

          <br />
          <Paper
            elevation={1}
            sx={{
              height: "auto",
              padding: "5vh",
              boxSizing: "border-box",
            }}
          >
            <form onSubmit={submithandler}>
              <TextField
                fullWidth
                required
                name="name"
                type="text"
                placeholder="Name"
                sx={{
                  margin: "5px 0",
                }}
              />
              <TextField
                fullWidth
                required
                name="mobile"
                type="number"
                placeholder="Mobile"
                sx={{
                  margin: "5px 0",
                }}
              />
              <TextField
                fullWidth
                type="email"
                name="email"
                required
                placeholder="Email"
                sx={{
                  margin: "5px 0",
                }}
              />
              <TextField
                fullWidth
                type="text"
                name="message"
                required
                multiline
                rows={5}
                placeholder="Message"
                sx={{
                  margin: "5px 0",
                }}
              />
              <Box mt={1.5} textAlign={"center"}>
                <button type="submit" className="button">
                  submit
                </button>
                <button type="reset" className="reset">
                  reset
                </button>
              </Box>
            </form>
          </Paper>
          <br />
        </Container>
        <AlertDialog open={alertOpen} setOpen={setAlertOpen} text={textAlert} />
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
    </Grid>
  );
};

export default Contact;
