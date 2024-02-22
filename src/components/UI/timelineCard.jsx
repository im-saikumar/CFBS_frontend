import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box, Stack } from "@mui/material";
import NotsigninDrawer from "./drawer";
import Dialog from "./Dialog";
import { useNavigate } from "react-router";
import {loginDetails, userDetails} from './../../components/loginDetails'
import useMediaQuery from '@mui/material/useMediaQuery';
import { ChatBubbleWithCount, LikeWithCount, ViewWithCount } from "../otherExports";



const   TimelineCard = ({ setOpenComment, data }) => {
  const [like, setLike] = useState(data.you_liked);
  const [save, setSave] = useState(data.you_saved);
  const [open, setOpen] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);

  const matches = useMediaQuery('(min-width:900px)');
  const mobilematches = useMediaQuery('(min-width:600px)');

  const navigate = useNavigate();
  const login  = loginDetails.login
  const [likeCount, setlikeCount] = useState(data.likes)
  const postOwner = data.email === userDetails?.email 

  const getLike = function() {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/liked`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setLike((e) => !e);
          !like ? setlikeCount((prev) => prev + 1) : setlikeCount((prev) => prev - 1)
        })
        .catch((err) => console.log(err));

        !postOwner && !like && fetch(`${process.env.REACT_APP_API}/notification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parent_post_id: data.id,
            title : `${userDetails.name} liked your post.`,
            name: "liked",
          })
        })
          .then((response) => response.json())
          .then(data => console.log(data))
          .catch((err) => console.log(err));
    } else {
      setOpen(true);
    }
  };


  const getComments = function () {
    setTimeout(()=>{
      setOpenComment(true)
    },300)
    clearTimeout()
    navigate(`/post/${data.id}`)  
  };

  const getSave = function () {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setSave((e) => !e);
        })
        .catch((err) => console.log(err));
    } else {
      setOpen(true);
    }
  } 

  const shareLink = function () {
    console.log("hello")
    setOpenShareLink(true);
  };

  return (
    <Box
      className="bg-primary"
      boxSizing={"border-box"}
      style={{
        margin: "5px 0",
        borderRadius: "5px",
        width: "100%",
        height: "135px",
        position: "relative",
        border: "2px solid #00000020",
        padding: 2,
        cursor : "default"
      }}
    >
      <Box className="flex">
        <div>
          <img
            onClick={() => navigate(`/post/${data.id}`)}
            loading="lazy"
            style={{ height: "127px", width: "127px", borderRadius: 3 , objectFit: "cover" }}
            // src={data.filename}
            src={data.imagepath}
            alt={data.filename}
          />
        </div>
        <Box className="flex" flexDirection={"column"} width={ !mobilematches ? "76%" : '100%'} pl={2}>
          <div onClick={() => navigate(`/post/${data.id}`)} style={{ textAlign: "left", marginTop: "5px" }}>
            <p style={{ marginBottom: "5px" }} className="regular">
              Published on {data.createdAt}
            </p>
            <p className= {`font-600 medium`}>
              {data.heading}
            </p>
            <p style={{width: !matches && '70%'}} className="font-Nota text-warp regular font-500">{data.description.split('<br />').join(" ")}</p>
          </div>
            <br />


            <Stack bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
              <LikeWithCount getLike={getLike} onClick={onclick} like={like}>{likeCount > 0 && likeCount}</LikeWithCount>
              <ChatBubbleWithCount onClick={getComments}>{data.comments > 0 && data.comments }</ChatBubbleWithCount>
                <ShareIcon
                  onClick={shareLink}
                  style={{ margin: "0px 10px 6px", display: "flex" }}
                />  
                <ViewWithCount>{data.views}</ViewWithCount>
                </Stack>
            <Stack right={'1vh'} bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
                {save ? (
                  <BookmarkIcon
                    onClick={getSave}
                    style={{ margin: "0px 10px 6px", display: "flex" }}
                  />
                ) : (
                  <BookmarkBorderIcon
                    onClick={getSave}
                    style={{ margin: "0px 10px 6px", display: "flex" }}
                  />
                )}
          </Stack>
        </Box>
      </Box>
      <NotsigninDrawer open={open} setOpen={setOpen} />
      <Dialog setOpenLink={setOpenShareLink} openLink={openShareLink}>
        {`${window.location.href}post/${data.id}`}
      </Dialog>
    </Box>
  );
};

export default TimelineCard;
