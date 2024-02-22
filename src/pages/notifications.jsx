import { Box, Container, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Menu from "../components/UI/Menu";
import { userDetails } from "../components/loginDetails";
import { useNavigate } from "react-router";
import ConfirmModal from "../components/UI/confirmModal";
import AlertDialog from "../components/UI/alertDialog";
import Loader from "../components/UI/loader/Loader";
import { Helmet } from "react-helmet";

const Notifications = ({setOpenComment}) => {
  const matches = useMediaQuery("(min-width:900px)");
  const [textAlert, setTextAlert] = useState('')
  const [open, setOpen] = useState(false)

  const NotificationsCard = (data) => {

    const {read, date, title, name, postId, id} = data.data
    const navigate = useNavigate()

    function markasRead(){

      fetch(`${process.env.REACT_APP_API}/read_notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userDetails.email,
          id: id
        })
      })
        .then((response) => response.json())
        .then(() => {
          name === "commented" && getComments();
          navigate(`/post/${postId}`);
        })
        .catch((err) => console.log(err));
    }

    const getComments = function () {
      setTimeout(()=>{
        setOpenComment(true)
      },300)
      clearTimeout()
    };

    return (
      <Box
        bgcolor={read ? "#fcfcfc" :"#f6f6f6"}
        border={read ? "1px solid #00000020" : "1px solid #000000"}
        mt={1}
        minHeight={70}
        boxSizing={"border-box"}
        borderRadius={1}
        style={{ padding: "10px 15px" }}
        onClick={markasRead}
      >
        <Stack
          className="regular"
          mb={1}
          direction="row"
          justifyContent={"space-between"}
        >
          <p className="font-black font-600">{name}</p>
          <p style={{ opacity: "80%" }}>{date}</p>
        </Stack>
        <p className="regular font-400">
          {title}
        </p>
      </Box>
    );
  };

  const [notificationDetails, setNotificationDetails] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const clearNotifications = function(){
    fetch(`${process.env.REACT_APP_API}/clear_notifications`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userDetails.email
      }),
    })
      .then((response) => response.json())
      .then(data => {
        setConfirmOpen(false);
        setOpen(true)
        setTextAlert(data.message)
      })
      .catch((err) => console.log(err))
      .finally(() => getNotifications())
  }
  const[pending, setPending] = useState(true)
  function getNotifications(){
    fetch(`${process.env.REACT_APP_API}/get_notifications?email=${userDetails.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(data => setNotificationDetails(data))
      .catch((err) => console.log(err))
      .finally(()=> setPending(false))
  }

  useEffect(()=>{
    getNotifications()
  },[])

  return (
    <>
        <Helmet>
            <title>CFBS - Notifications</title>
            <meta name="title" content="Notifications" />
        </Helmet>

        <Grid mt={8} mb={5} container item marginX={1} className="flex">
      <Grid container md={8} item display={"block"}>
        <Container maxWidth={matches && "sm"}>
          <Stack height={40}  flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <p className="medium font-600">Your Notifications</p>
          {notificationDetails.length > 0 && <button className="reset font-500" onClick={() => setConfirmOpen(true)}>Clear all</button>}
          </Stack>
          <br />
          {pending && <Loader/>}
          {notificationDetails.length === 0 && <p className='medium font-400'>No notifications are availble</p>}
          {notificationDetails.map((data) => <NotificationsCard key={data.id} id={data.id} data={data} />)}
        </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={clearNotifications}>Are you sure to clear all notifications?</ConfirmModal>
      <AlertDialog open={open} setOpen={setOpen} text={textAlert} />
    </Grid>
    </>
  );
};

export default Notifications;
