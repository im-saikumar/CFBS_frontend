import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Container, TextField } from "@mui/material";
import { TextInputProps } from "../../pages/createPost";
import ConfirmModal from "./confirmModal";
import { userDetails } from "../loginDetails";
import { useNavigate } from "react-router";

export default function RequestDialog({ setOpenLink, openLink, id, data}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleClose = () => {
    setOpenLink(false);
    setYourRequestText('')
    deleteImage()
  };

  const [yourRequestText, setYourRequestText] = React.useState("");

  function formSubmitHandler(e){
    e.preventDefault()
    setConfirmOpen(true)
  }

  const postOwner = data.email === userDetails?.email 

  const submit = async function () {

    const formData = new FormData();
      formData.append('id', id);  
      formData.append('image', image);
      formData.append("description", yourRequestText.replace(/\n/g, "<br />"))
      formData.append("email", userDetails.email)
      formData.append("name", userDetails.name)
      try {
      const response = await fetch(`${process.env.REACT_APP_API}/upload_request`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Success:", result);
      // alert(result.message)
      setConfirmOpen(false)
      setOpenLink(false)
      handleClose()
    } 
    catch (error) {
      console.error("Error:", error);
    }

      postOwner && fetch(`${process.env.REACT_APP_API}/apporved`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userDetails.email,
        id: id,
        apporve : false,
      })
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((err) => console.log(err))

      !postOwner && fetch(`${process.env.REACT_APP_API}/notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parent_post_id: id,
          title : `${userDetails.name} responded on your post for request to complete.`,
          name: "responded",
        })
      })
        .then((response) => response.json())
        .then(data => console.log(data))
        .catch((err) => console.log(err));

      navigate(0)
  }

  const [imageUrl, setImageUrl] = React.useState(null);
  const [imageValue, setImageValue] = React.useState('')
  const [image, setImage] = React.useState();


  function onImageChange(e) {
    setImageValue(e.target.value)
    setImage(e.target.files[0]);
    const imageFile = e.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    console.log(imageURL)
    setImageUrl(imageFile?.name);
  }

  
  function deleteImage(){
    setImage();
    setImageUrl(null);
    setImageValue('')
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openLink}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
      <Container maxWidth="sm" sx={{marginBottom: '20px' , padding: 0}}>
      <form onSubmit={formSubmitHandler}>
        {/* <DialogTitle id="responsive-dialog-title">{"Request to complete"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            <Box minHeight={'20vh'} minWidth={'50vh'}>
              <Box marginY={1}>
                <p className="font-black medium font-600">Fill your details to close this issue</p>
              </Box>
            {imageUrl !== null && <Box
              display={"flex"}
              alignItems={"center"}
              bgcolor={"#EAF0FF"} 
              color={"black"} 
              height={50}
              borderRadius={1} 
              marginY={1}
              sx={{width:'100%', border: "2px solid #00000020"}} 
              p={2}>
                {imageUrl}
              </Box>}
                <TextField
                  fullWidth
                  marginY={1}
                  required
                  id="outlined-multiline-static"
                  label="your request text"
                  multiline
                  rows={10}
                  placeholder="write here"
                  value={yourRequestText}
                  onChange={(e) => setYourRequestText(e.target.value)}
                  {...TextInputProps}
                  />
              {imageUrl !== null ? 
                <Box
                  display={"flex"}
                  bgcolor={"#BF3131"} 
                  color={"white"} 
                  marginY={1}
                  borderRadius={1} 
                  sx={{width:'100%'}} 
                  justifyContent={"space-between"} 
                  alignItems={"center"} 
                  p={2}>
                <Box > Delete image</Box>
                <Box onClick={deleteImage} sx={{cursor: "pointer"}}>✖</Box>
                </Box> :  
                  <TextField
                    fullWidth
                    required
                    value={imageValue}
                    onChange={onImageChange}
                    type="file"
                    placeholder="upload the image here"
                    inputProps={{accept:"image/jpeg"}}
                    {...TextInputProps}
                    marginY={1}
                  /> }
                  </Box>
                  <Box marginTop={2} textAlign={"right"}>
                    <button type="submit" className="button">
                      submit
                    </button>
                    <button className="reset" type="reset" onClick={handleClose}>
                      close
                    </button>
                  </Box>
          </DialogContentText>
        </DialogContent>
        </form>
        </Container>
      </Dialog>
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={submit}>Are you sure ?</ConfirmModal>
    </React.Fragment>
  );
}
