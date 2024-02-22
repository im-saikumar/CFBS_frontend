import { Box, Container, Dialog, DialogContent, DialogContentText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { TextInputProps } from '../../pages/createPost'

import useMediaQuery from "@mui/material/useMediaQuery";
import ConfirmModal from './confirmModal'
import { useTheme } from "@mui/material/styles";
import { userDetails } from '../loginDetails';
import AlertDialog from './alertDialog';

const EditDialog = ({open, setOpen, data, setPageRefresh }) => {

  const [heading, setHeading] = useState(data.heading) 
  const [subheading, setSubheading] = useState(data.subheading) 
  const [description, setDescription] = useState(data.description.split('<br />').join(" ").trim()) 

  console.log(heading, subheading)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const [textAlert, setTextAlert] = useState('')


  const handleClose = () => {
    setOpen(false);
    setHeading('')
    setSubheading('')
    setDescription('')
  };

  const formSubmitHandler = function(e){
    e.preventDefault()
    setConfirmOpen(true)
  }

  function submit(){
    fetch(`${process.env.REACT_APP_API}/edit_post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        email: userDetails.email,
        heading: heading,
        subheading: subheading,
        description : description
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setConfirmOpen(false)
        // alert(data.message)
        setAlertOpen(true)
        setTextAlert(data.message)
      })
      .catch((err) => console.log(err))
      .finally(() =>{
        setTimeout(() =>{
          handleClose()
          setPageRefresh(e => !e)
        },1000)
      });
  }



  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
      <Container maxWidth="sm" sx={{marginBottom: '20px' , padding: 0}}>
      <form onSubmit={formSubmitHandler}>
        <DialogContent>
          <DialogContentText>
            <Box minHeight={'20vh'} minWidth={'50vh'}>
              <Box marginBottom={1}>
                <p className="font-black medium font-600">Edit your post details</p>
              </Box>
                <TextField
                    fullWidth
                    required
                    type="text"
                    name='heading'
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="write here"
                    {...TextInputProps}
                    marginY={1}
                  /> 
                <TextField
                    fullWidth
                    name="subheading"
                    value={subheading}
                    onChange={(e) => setSubheading(e.target.value)}
                    type="text"
                    placeholder="optional"
                    {...TextInputProps}
                    marginY={1}
                />
                <TextField
                  fullWidth
                  marginY={1}
                  required
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="outlined-multiline-static"
                  multiline
                  rows={10}
                  placeholder="write here"
                  {...TextInputProps}
                />
              </Box>
              <Box marginTop={2} textAlign={"right"}>
                <button type="submit" className="button">
                  save
                </button>
                <button className="reset" type="reset" onClick={handleClose}>
                  cancel
                </button>
              </Box>
          </DialogContentText>
        </DialogContent>
        </form>
        </Container>
      </Dialog>
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={submit}>Are you sure ?</ConfirmModal>
      <AlertDialog open={alertOpen} setOpen={setAlertOpen} text={textAlert} />
    </React.Fragment>
  )
}

export default EditDialog