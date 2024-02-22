import React, { useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { options } from "../otherExports";
import { userDetails } from "../loginDetails";
import ConfirmModal from "./confirmModal";
import Loader from "./loader/Loader";

const RequestSection = ({ data ,setPageRefresh}) => {
  const [requests] = useState(data.requests.sort((a, b) => b.id.localeCompare(a.id)));
  const [confirmOpen, setConfirmOpen] = useState(false);

  function approveHandle(){
    fetch(`${process.env.REACT_APP_API}/apporved`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userDetails.email,
        id: data.id,
        apporve : true,
      })
    })
      .then((response) => response.json())
      .then(() => {
        setPageRefresh(e => !e)
        setConfirmOpen(false)
      })
      .catch((err) => console.log(err));
  }
  const approved = data.status === "closed"
  const requestCheck = requests?.length>0

  const RequestCard = function({value, id}){
    
    const [loading, setLoading] = useState(true);
    const date = new Date(value.date).toLocaleDateString("en-IN",options);
    const paragraph = value?.description.split("<br />");

    return (
            <Box 
              bgcolor="#f9f9f9"
              border={"1px solid #00000040"}
              // borderRadius={1}
              key={id} id={id} p={1}
              marginTop={2}
            >
              {/* <br/>
              <Divider />
              <br /> */}
              
              <Stack
                className="regular font-400"
                pt={1} pb={1}
                direction="row"
                justifyContent={"space-between"}
                // bgcolor='#ececec'
              >
                <p style={{ opacity: "80%" }}>via : {value.name}</p>
                <p style={{ opacity: "80%" }}>{date}</p>
              </Stack>
              <Divider color="#ececec" key={id}/>
              <Box
                // bgcolor="#f6f6f6"
                // border={"1px solid #00000020"}
                mt={1}
                mb={1}
                // p={1}
                boxSizing={"border-box"}
                // borderRadius={1}
              >
                {paragraph.map((value, i) => (
                  <>
                    <p
                      style={{ whiteSpace: "pre-wrap" }}
                      className="font-500 text-justified"
                      key={i}
                    >
                      {value}
                    </p>
                    {value.length === 0 && <br/>}
                  </>
                ))}
              </Box>
              <Box width={"100%"}>
                {loading && <Loader/> }
                <img
                  width={"100%"}
                  src={value.imagepath}
                  alt="request_image"
                  loading="lazy"
                  onLoad={() => {setLoading(false)}}
                  style={{
                    // marginBottom: "20px",
                    display:` ${loading ? "none" : "block"}`
                  }}
                />
              </Box>
            </Box>
    )
  }
  
  return (
    <Box mb={8} role="presentation">
      <Stack
        className="regular font-500"
        mb={1}
        direction="row"
        justifyContent={"space-between"}
      >
        <p className="sub-heading font-600 center">Resolution</p>
        {userDetails?.email === data.email && requestCheck && 
        <button 
        disabled = {approved}
        onClick={() => setConfirmOpen(true)} 
        className={approved ? "buttonDis" :"button"}>
          {data.status === "closed" ? "Approved" : "Approve" }
        </button>}
      </Stack>
      <br />
      {!requestCheck && <p>No solution is available</p>}
      {requestCheck && requests.map((value, i) => <RequestCard value={value} key={i} id={i}/>)}
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={approveHandle}>Are you sure for approving to close the issue?</ConfirmModal>
    </Box>
  );
};

export default RequestSection;
