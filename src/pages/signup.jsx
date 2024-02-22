import { Box, Container, Paper, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { loginDetails } from '../components/loginDetails';

const SignUp = () => {

  const navigate = useNavigate();

  const login  = loginDetails.login

  useEffect(()=>{
    login && navigate('/')
  },[login ,navigate])

  return (
    <Container maxWidth="sm">
      <Box mt={18} textAlign={"center"}>
      <Paper elevation={3} sx={{
        minHeight: '60vh',
        padding: '5vh',
        boxSizing: 'border-box'
      }}>
        <p className="sub-heading font-600 text-center">Join C.F.B.S</p><br/>

        <TextField
              fullWidth
              required
              type="text"
              label="Name"
              placeholder="type here"
              sx={{
                margin: "10px 0",
              }}
            />

        <TextField
              fullWidth
              required
              type="email"
              label="Your email"
              placeholder="type here"
             sx={{
                margin: "10px 0",
              }}
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              placeholder="type here"
              sx={{
                margin: "10px 0",
              }}
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Confirm password"
              placeholder="type here"
              sx={{
                margin: "10px 0",
              }}
            />

            <Box mt={1} mb={1}>
              <button type="submit" className="button">
                Submit
              </button>
              <button onClick={()=>navigate(-1)} type="button" className="reset">
                back
              </button>
            </Box>
            <p>or</p>
            <Box mt={1} mb={1}>
              <button type="submit" className="button">
              <p style={{display: "flex"}}><GoogleIcon style={{ marginRight: '30px'}}/> <span>Sign up with google</span></p>
              </button>
            </Box><br/>
            <p>Already have an account? <span className="font-700"><Link className="link" to={'/signin'}>Sign in</Link></span></p>
      </Paper>
      </Box>

    </Container>
  )
}

export default SignUp