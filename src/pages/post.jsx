import { Box, Container, Divider, Menu, MenuItem, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NotsigninDrawer from "../components/UI/drawer";
import RequestSection from "../components/UI/requestSection";
import Dialog from "../components/UI/Dialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate, useParams } from "react-router";
import {loginDetails, userDetails} from '../components/loginDetails'
import CommentDrawer from "../components/UI/commentsDrawer";
import RequestDialog from "../components/UI/RequestDialog";
import ConfirmModal from "../components/UI/confirmModal";
import { ChatBubbleWithCount, LikeWithCount} from "../components/otherExports";
import Loader from "../components/UI/loader/Loader"
import EditDialog from "../components/UI/EditDialog";
import AlertDialog from "../components/UI/alertDialog";
import { Helmet } from "react-helmet";



const PostDetails = ({openComment, setOpenComment}) => {
  const { id } = useParams("");
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false)
  const [textAlert, setTextAlert] = useState('')



  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [loginPop, setLoginPop] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);
  const [requestDialog, setRequestDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)

  const [data, setData]= useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const moreOpen = Boolean(anchorEl);  
  const [paragraph, setParagraph] = useState([])

  const matches = useMediaQuery('(min-width:900px)');
  const login  = loginDetails.login
  const [likeCount, setlikeCount] = useState(0)

  const postOwner = data.email === userDetails?.email 
  const [pageRefresh, setPageRefresh] = useState(false)
  const [pageTitle, setPageTitle] = useState("page details")

  
  useEffect(() => {

    async function fetchData(ipAddress){
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/post_details`, {
        method: "POST",
        // credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "id" : id,
          "ip" : ipAddress,
          "email": userDetails && userDetails.email 
        })
      })
      const result = await response.json();
      // console.log("Success:", result);
      setData(result)
      setPageTitle(result.heading)
      setlikeCount(result.likes)
      const spiltLine = result?.description.split('<br />')
      setParagraph(spiltLine)
      setLike(result.you_liked)
      setSave(result.you_saved)
    }
    catch(error){
      console.log(error)
    }
  }
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data =>  fetchData(data.ip))

  }, [id, pageRefresh]);

  // console.log(paragraph.join(','))

  const EditPost = useCallback(() => openEdit && <EditDialog data={data} open={openEdit} setOpen={setOpenEdit} setPageRefresh={setPageRefresh}/>, [data, openEdit]);

  const getLike = function() {
    if (login) {
        fetch(`${process.env.REACT_APP_API}/liked`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            email: userDetails.email,
          })
        })
        .then((response) => response.json())
        .then(() => {
          setLike((e) => !e);
          !like ? setlikeCount((prev) => prev + 1) : setlikeCount((prev) => prev - 1)
        })
        .catch((err) => console.log(err));

        !postOwner && fetch(`${process.env.REACT_APP_API}/notification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parent_post_id: id,
            title : `${userDetails.name} liked your post.`,
            name: "liked",
          })
        })
          .then((response) => response.json())
          .then(data => console.log(data))
          .catch((err) => console.log(err));
    } else {
      setLoginPop(true);
    }
  };

  const getComments = function () {
    setOpenComment(true)
  };

  const getSave = function () {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setSave((e) => !e);
        })
        .catch((err) => console.log(err));
    } else {
      setLoginPop(true);
    }
  } 

  const shareLink = function () {
    setOpenShareLink(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (e) => {
    setAnchorEl(null);
    if(login){
      if(e.target.value === 0){
        if(data.requests.length > 0 || userDetails.email !== data.email){
          setRequestDialog(true); 
        }else{
          setAlertOpen(true)
          setTextAlert("At least one person should post on solution")
        }
      }
      if(e.target.value === 1){
        if(userDetails.email === data.email && data.requests.length === 0){
          setOpenEdit(true)
        }else{
          setTimeout(()=>{
            fetch(`${process.env.REACT_APP_API}/reporting`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: data.id,
                email: userDetails.email,
              })
            })
              .then((response) => response.json())
              .then((data) => {
                setAlertOpen(true)
                setTextAlert(data.message)
              })
              .catch((err) => console.log(err))
          },800)
          clearTimeout()
        }  
      }
      if(e.target.value === 2){
        setConfirmOpen(true)
      }
    }else{
      setLoginPop(true);
    }   
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
        navigate(-1)
      });
  };

  const targetRef = useRef(null);

  // const handleScroll = () => {
  //   if (targetRef.current) {
  //     targetRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };
  // showResponse && handleScroll()


  const menuList = (postOwner && data.requests?.length === 0) ? 
  ["Respond", "Edit post", "Delete post"] : 
  [`${postOwner ? "Respond" : "Resolution"}`, "Report"]

  return (
    <Container maxWidth="md" style={{ padding : matches && "0 100px"}}>

      <Helmet>
            <title>CFBS - {pageTitle}</title>
            <meta name="title" content={data.heading} />
            {data.subheading && <meta name="subheading" content={data.subheading} />}
            <meta name="description" content={paragraph.join(',')} />
        </Helmet>

      <Box mt={8} mb={8}>
        <Box>
          <p className="heading font-700">{(data.heading)}</p>
          <br />
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">User : {data.name}</p>
            <p>Published on {data.createdAt}</p>
          </Box>
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">
              Issue :{" "}
              <span className="font-500 uppercase" style={{ color: `${data.status === "pending" && "red"}` }}>
                {data.status}
              </span>
            </p>
            <p>{data.state}, {data.district}</p>
          </Box>
          <br />
          <Box
            className="flex center"
            height={40}
            padding={1}
            position="relative"
            border={"1px solid #e2e2e2"}
            boxSizing={"border-box"}
            justifyContent={"space-between"}
            pt={1}
            sx={{
              borderStyle: "solid hidden",
            }}
          >
            <LikeWithCount getLike={getLike} onClick={onclick} like={like}>{likeCount > 0 && likeCount }</LikeWithCount>
            <ChatBubbleWithCount onClick={getComments}>{data.comments > 0 && data.comments }</ChatBubbleWithCount>
            <ShareIcon onClick={shareLink} />
            {save ? (<BookmarkIcon onClick={getSave} />) : (<BookmarkBorderIcon onClick={getSave} />)}
            {(data.status === "pending" || postOwner) && <MoreHorizIcon onClick={handleClick} />}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={moreOpen}
              onClose={handleClose}
            >
              {menuList.map((value, i) => {
              return <MenuItem value={i} key={i} onClick={handleClose}>{value}</MenuItem>
              })}
            </Menu>
          </Box>
          <br />
          <Box width={"100%"}>
            {loading && <Loader/> }
            <img
              width={"100%"}
              src={data.imagepath}
              alt="post_image"
              onLoad={() => {setLoading(false)}}
              loading="lazy"
              style={{
                marginBottom: "20px",
                display:` ${loading ? "none" : "block"}`
              }}
            />
          </Box>
          <Box>Post seen : {data.views}</Box>
          <br />
          {data.subheading && <><p style={{whiteSpace: "pre-wrap"}} className="sub-heading font-700">
              {data.subheading}
          </p><br/></>}
          {paragraph.map((value, i) => (
            <>
            <p style={{whiteSpace: "pre-wrap"}} className="font-Nota medium font-400 text-justified" key={i}>
              {value}
            </p>
            <br/>
            </>
          ))}
          {/* <p className="medium font-400 text-justified" >{data.description}</p> */}
          <br/>
        </Box>
      </Box>
      <EditPost/>
      <Divider style={{ marginBottom: "50px" }} ref={targetRef} />
      <CommentDrawer data={data} id={id} open={openComment} setOpen={setOpenComment} />
      {data.requests && <RequestSection data={data} setPageRefresh={setPageRefresh} />}

      <Dialog setOpenLink={setOpenShareLink} openLink={openShareLink}>
        {window.location.href}
      </Dialog>
      
      <RequestDialog data={data} setOpenLink={setRequestDialog} openLink={requestDialog} id={id}/>
      <NotsigninDrawer open={loginPop} setOpen={setLoginPop} />
      <AlertDialog open={alertOpen} setOpen={setAlertOpen} text={textAlert} />
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={deletePost}>Are you sure to delete this post?</ConfirmModal>
    </Container>
  );
};

export default PostDetails;
