import React, { useEffect, useState } from 'react'
import { Box, Container, Divider, Grid, useMediaQuery } from '@mui/material'
import Menu from '../components/UI/Menu'
import { useNavigate } from 'react-router';
import { loginDetails, userDetails } from '../components/loginDetails';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AlertDialog from '../components/UI/alertDialog';

const Profile = () => {

  const navigate = useNavigate();
  const login  = loginDetails.login
  const [alertOpen, setAlertOpen] = useState(false)
  const [textAlert, setTextAlert] = useState('')



  useEffect(()=>{
    !login && navigate('/signin')
  },[login ,navigate])

  const firstLetter = userDetails?.name.slice(0,1).toUpperCase()
  const matches = useMediaQuery('(min-width:900px)');


  const image = userDetails?.picture

  function deleteAccount(){
    setAlertOpen(true)
    setTextAlert("we are working to develop")
  }


  return (
    <Grid mt={8} mb={5} container item marginX={1} className="flex">

        <Helmet>
            <title>CFBS - Profile</title>
            <meta name="title" content="your profile" />
        </Helmet>

      <Grid container md={8} item display={'block'} padding={ matches && '0 20px'}>
      <Container maxWidth="sm">
        <p className='medium font-600'>Profile</p>
        <Divider><p className='font-500'>Account</p></Divider>
        <br/>
        <Box
        bgcolor={'grey'}
        color={'white'}
        height={100}
        width={100}
        borderRadius={50} 
        display={'flex'}
        justifyContent={'center'}
        alignItems={"center"}
        fontSize={'80px'}
        boxSizing={"border-box"}
        fontWeight={"600"}
        sx={{
          objectFit: "fill",
          cursor: "default"
        }}
        >
          {image ? <img style={{borderRadius: '50%'}} src={image} alt='profile_image'/> : firstLetter}
        </Box>
        <br/>
        <p className='heading font-700 capitalize'>{userDetails?.name}</p>
        <p className='font-400'>Email : {userDetails?.email}</p>
        <br/>
        <Divider><p className='font-500'>Security</p></Divider>
        <br/>
        <Link onClick={deleteAccount} style={{color:'red'}} className='font-500'>Deactive Account</Link>
        <p>Deactivating will suspend your account until you sign back in.</p><br/>
        <Link onClick={deleteAccount} style={{color:'red'}} className='font-500'>Delete Account</Link>
        <p>Permanently delete your account and all of your content.</p>
        </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
      <AlertDialog open={alertOpen} setOpen={setAlertOpen} text={textAlert} />
    </Grid>
  )
}
export default Profile;