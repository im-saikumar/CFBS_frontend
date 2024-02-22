import { Box, Divider, Fab, Grid, Stack, useMediaQuery } from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { loginDetails, userDetails } from '../loginDetails';
import Drawer from './drawer';
import Dialog from "./Dialog";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from './confirmModal';
import { ChatBubbleWithCount, LikeWithCount, ViewWithCount } from '../otherExports';


const SavedCard = ({ setOpenComment, data, setReload }) => {
  const [like, setLike] = useState(data.you_liked);
  const [save, setSave] = useState(data.you_saved);
  const [open, setOpen] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);


  const matches = useMediaQuery('(min-width:900px)');

  const navigate = useNavigate();

  const login  = loginDetails.login

  const [likeCount, setlikeCount] = useState(data.likes)

  const postOwner = data.email === userDetails?.email 


  function getLike () {
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
    setOpenShareLink(true);
  };


  function deletePost() {
    fetch(`${process.env.REACT_APP_API}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        email: userDetails.email,
        image: data.imagepath
      })
    })
      .then((response) => response.json())
      .then(() => {
        setConfirmOpen(false)
      })
      .catch((err) => console.log(err))
      .finally(() =>{
        setReload(e => !e)
      });
  };


  return (
    <Grid container sm={6} item>
      <Box
        className="bg-primary"
        boxSizing={"border-box"}
        style={{
          borderRadius: "5px",
          width: "100%",
          minHeight: "260px",
          position: "relative",
          border: "1px solid #00000020",
          // padding: 2,
          cursor : "default",
          paddingBottom: '40px'
        }}
      >
        {(data.email === userDetails?.email && data.requests.length === 0) &&
        <Fab size='small'onClick={()=> setConfirmOpen(true)} color='error' style={{top: 10, right: 10 ,position: "absolute"}}>
          <DeleteIcon/>
        </Fab>}
        <Box>
            <img
              onClick={() => navigate(`/post/${data.id}`)}
              style={{ height: "150px", width: "100%",objectFit :"cover" , borderRadius: "3px 3px 0 0"}}
              loading="lazy"
              src={data.imagepath}
              alt={data.filename}
            />
          <Box p={'1vh'} flexDirection={"column"} width={"100%"}>
            <div onClick={() => navigate(`/post/${data.id}`)} style={{textAlign: "left" }}>
              <p style={{ marginBottom: "5px" }} className="regular">
                Published on {data.createdAt}
              </p>
              <p className= {`font-600 ${!matches? 'regular' : 'medium'}`} style={{ marginBottom: "2px" }}>
                {data.heading}
              </p>
              <p className="text-warp regular font-300">{data.description.split('<br />').join(" ")}</p>
            </div>
            </Box>
            <Box>
              <Stack left={'1vh'} bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
              <LikeWithCount getLike={getLike} onClick={onclick} like={like}>{likeCount > 0 && likeCount }</LikeWithCount>
              <ChatBubbleWithCount onClick={getComments}>{data.comments > 0 && data.comments }</ChatBubbleWithCount>

                  <ShareIcon
                    onClick={shareLink}
                    style={{ margin: "0px 10px", display: "flex" }}
                  />
                  
            <ViewWithCount>{data.views}</ViewWithCount>
            </Stack>

              <Stack right={'1vh'} bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
                  {save ? (
                    <BookmarkIcon
                      onClick={getSave}
                      style={{  display: "flex" }}
                    />
                  ) : (
                    <BookmarkBorderIcon
                      onClick={getSave}
                      style={{  display: "flex" }}
                    />
                  )}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Drawer open={open} setOpen={setOpen} />
        <Dialog setOpenLink={setOpenShareLink} openLink={openShareLink}>
          {`${window.location.href}post/${data.image_id}`}
        </Dialog>
        <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={deletePost}>Are you sure to delete this post?</ConfirmModal>
    </Grid>
  );
}

export default SavedCard