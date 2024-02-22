import { Box, Container, MenuItem, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginDetails, userDetails} from '../components/loginDetails'
import ConfirmModal from "../components/UI/confirmModal";
import AlertDialog from "../components/UI/alertDialog";
import { Helmet } from "react-helmet";

export const TextInputProps = {
  InputLabelProps:{
    style: { color: 'grey' },
  },
  sx:{
    margin: "5px 0",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: 'black',
        border: 2
      }
    }
  } 
}

const CreatePost = () => {
  const navigate = useNavigate();

  const login  = loginDetails.login
  const [stateList, setStateList] =  useState([])

  useEffect(()=>{
    !login && navigate('/')
      login && 
      fetch(`${process.env.REACT_APP_API}/states`,{
                headers: { "Content-Type": "application/json" },
                method: "GET",    
                }).then(res => res.json())
                .then(data => setStateList(data.data) )
                .catch(error => console.log(error))
  },[login ,navigate])


  const [subject, setSubject] = useState("");
  const [subheading, setSubheading] = useState("");

  const [story, setStory] = useState("");
  const [stateValue, setStateValue] = useState(30);
  const [districtValue, setDistrictValue] = useState("");
  const [userVisiblity, setUserVisiblity] = useState('');

  const [image, setImage] = useState();
  const [imageValue, setImageValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  function onImageChange(e) {
    setImageValue(e.target.value)
    setImage(e.target.files[0]);
    const imageFile = e.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    console.log(imageURL)
    setImageUrl(imageFile?.name);
  }

  function reset() {
    setImage();
    setImageUrl(null);
    setSubject("");
    setSubheading('')
    setStory("");
    setImageValue('')
    setUserVisiblity('')
    setStateValue('')
    setDistrictValue('')
  }

  function deleteImage(){
    setImage();
    setImageUrl(null);
    setImageValue('')
  }

  // console.log(imageUrl)


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [textAlert, setTextAlert] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)




  const submit = async function (event) {

    const formData = new FormData();
      formData.append("title", subject);
      formData.append('image', image);
      formData.append("description", story.replace(/\n/g, "<br />").trim())
      formData.append("sub_heading", subheading.trim())
      formData.append("visiblity", userVisiblity)
      formData.append("email", userDetails.email)
      formData.append("name", userDetails.name)
      formData.append("state", stateList[stateValue]?.state)
      formData.append("district", districtValue)
      try {
      const response = await fetch(`${process.env.REACT_APP_API}/upload_post`, {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });
      const result = await response.json();
      console.log("Success:", result);
      setConfirmOpen(false)
      setAlertOpen(true)
      setTextAlert(result.message)
      reset()
      setTimeout(() =>{
        navigate('/')
      },1200)
    } 
    catch (error) {
      console.error("Error:", error);
    }
  }

  function handleConfirmation(event){
    event.preventDefault()
    setConfirmOpen(true)
  }

  return (
    <Container maxWidth="md">

        <Helmet>
            <title>CFBS - Write</title>
            <meta name="title" content="write your article" />
        </Helmet>


      <Box className="center text-center" mt={8} mb={8}>
        <p className="heading font-800 capitalize">create post</p>
        <form onSubmit={handleConfirmation}>
          <Box
            m={2}
            p={2}
            style={{
              borderRadius: "5px",
              minHeight: "30vh",
              position: "relative",
              cursor: "pointer",
              border: "2px solid #00000020",
            }}
          >
            <TextField
              fullWidth
              required
              label="heading"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="write here"
              date
              {...TextInputProps}
            />

            {/* {imageUrl !== null && <img style={{height: '200px'}} src={imageUrl} alt="image_preview" />} */}
            {imageUrl !== null && <Stack   direction={{ xs: 'column', sm: 'row' }} spacing={1}
              sx={{
                margin: "5px 0 15px",
              }}
              >
              <Box
                display={"flex"}
                alignItems={"center"}
                bgcolor={"#EAF0FF"} 
                color={"black"} 
                height={50}
                flex={3}
                borderRadius={1} 
                sx={{width:'100%', border: "2px solid #00000020", margin: "5px 0 10px"}} 
                p={2}>
                  {imageUrl}
              </Box>
              <Box
                display={"flex"}
                bgcolor={"#BF3131"} 
                color={"white"} 
                flex={1}
                borderRadius={1} 
                sx={{width:'100%'}} 
                justifyContent={"space-between"} 
                alignItems={"center"} 
              p={2}>
            <Box > Delete image</Box>
            <Box onClick={deleteImage}>✖</Box>
            </Box>
            </Stack>}
            {imageUrl === null && 
            <TextField
              fullWidth
              required
              type="file"
              value={imageValue}
              inputProps={{accept:"image/jpeg, image/png "}}
              onChange={onImageChange}
              {...TextInputProps}
            /> }
            <Stack   direction={{ xs: 'column', sm: 'row' }} spacing={1}
              sx={{
                margin: "5px 0",
              }}
              >
             <TextField
              fullWidth
              required
              disabled
              type="text"
              label="state"
              value={stateValue}
              onChange={(e) => setStateValue(e.target.value)}
              placeholder="text here"
              {...TextInputProps}
              select
              >
                {stateList.map((value, i) => <MenuItem key={i} value={i}> {value.state}</MenuItem>)}
            </TextField>
            <TextField
              fullWidth
              required
              type="text"
              label="disrtict"
              value={districtValue}
              onChange={(e) => setDistrictValue(e.target.value)}
              placeholder="text here"
              {...TextInputProps}
              select
              >
                {stateList[stateValue]?.districts.map((value, i) => <MenuItem key={i} value={value}> {value}</MenuItem>)}
            </TextField>
              <TextField
                fullWidth
                {...TextInputProps}
                value={userVisiblity}
                label="display your name"
                variant="outlined"
                placeholder=""
                onChange={(e)=> setUserVisiblity(e.target.value)}
                required
                select
                
              >
                <MenuItem value={true}>{userDetails.name}</MenuItem>
                <MenuItem value={false}>anonymous</MenuItem>
              </TextField>
              </Stack>

            <TextField
              fullWidth
              label="sub-heading (optional)"
              value={subheading}  
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="optional"
              {...TextInputProps}
            />

            <TextField
              fullWidth
              required
              id="outlined-multiline-static"
              label="descrption"
              multiline
              rows={10}
              placeholder="write here"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              {...TextInputProps}
            />

            <Box mt={2}>
              <button type="submit" className="button">
                post
              </button>
              <button type="reset" onClick={reset} className="reset">
                reset
              </button>
            </Box>
          </Box>
        </form>
      </Box>
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={submit}>Are you sure ?</ConfirmModal>
      <AlertDialog open={alertOpen} setOpen={setAlertOpen} text={textAlert} />
    </Container>
  );
};

export default CreatePost;
