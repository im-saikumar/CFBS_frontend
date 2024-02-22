import { Box, Container, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import { loginDetails } from "../components/loginDetails";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {

  const navigate = useNavigate();

  const userEmailRef = useRef('')

  const login  = loginDetails.login

  useEffect(()=>{
    login && navigate('/')
  },[login ,navigate])


  function signButton(e){
    e.preventDefault()
    const userDetails = {
      name: userEmailRef.current.value.split('@')[0],
      email: userEmailRef.current.value,
      login: true
    }
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate(0)
  }

  const storedValue = JSON.parse(localStorage.getItem('userDetails'));


  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async codeResponse => {
        // console.log(codeResponse);
        const tokens = await fetch(`${process.env.REACT_APP_API}/auth/google/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                'code': codeResponse.code,
            })
          })

        const data = await tokens.json();
        // console.log(data)
        if (data.email_verified){
            const userDetails = {
              name: data.name,
              email: data.email,
              login: data.email_verified,
              picture : data.picture
            }
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          navigate(0)
        }

        // const userDetails = {
        //   name: userEmailRef.current.value.split('@')[0],
        //   email: userEmailRef.current.value,
        //   login: true
        // }
        // localStorage.setItem('userDetails', JSON.stringify(userDetails));
        // navigate(0)


        // const tokens = await fetch(`https://oauth2.googleapis.com/token`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //       'code': codeResponse.code,
        //       'client_id': '782661790171-6vqudk01fu4sajid0huvbr3d4qu29cv7.apps.googleusercontent.com',
        //       'client_secret': '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',
        //       'redirect_uri': 'http://localhost:3000',
        //       'grant_type': 'authorization_code'
        //     }),
        // });
        // const result = await tokens.json();
        // console.log("Success:", result);
    }
})

  return (
    <Container maxWidth="sm">
      <Box mt={18} textAlign={"center"}>
      <Paper elevation={3} sx={{
        minHeight: '60vh',
        padding: '5vh 3vh',
        boxSizing: 'border-box'
      }}>
        <p className="sub-heading font-800 text-center">Welcome C.F.B.S</p><br/>
        <Box textAlign={"left"} padding={2}>
          <p className="medium font-600">Terms & conditions </p>
          <ul style={{paddingLeft: "16px", paddingTop: '10px'}}>
            <li style={{marginBottom: "8px"}}>To create a post, click the "Write" button.</li>
            <li style={{marginBottom: "8px"}}>Users can choose to remain anonymous by selecting the "anonymous" visibility option during post creation.</li>
            <li style={{marginBottom: "8px"}}>Note that once a post is uploaded, you can edit or delete it until someone raises a solution to complete.</li>
            <li style={{marginBottom: "8px"}}>If no completion solution has been raised, authors can freely edit or delete their posts.</li>
            <li style={{marginBottom: "8px"}}>However, once a completion solution is raised, editing or deletion is restricted to maintain the integrity of the issue resolution process.</li>
            <li style={{marginBottom: "8px"}}>Users are encouraged to engage with posts by providing comments or responses.</li>
            <li style={{marginBottom: "8px"}}>Only the post author has the authority to close an issue.</li>
            <li style={{marginBottom: "8px"}}>If a user is marked as "anonymous," all comments or responses will also be displayed as "anonymous."</li>
            <li style={{marginBottom: "8px"}}>Any posts containing adult content posted anonymously will lead to the submission of the post author's username for visibility.</li>
            <li style={{marginBottom: "8px"}}>Once the post issue status is set to "closed" by the author, it will be displayed in the Cleared Issues page.</li>
            <li style={{marginBottom: "8px"}}>Closure of an issue signifies that the concern has been addressed to the satisfaction of the author.</li>
          </ul>
        </Box>
        {/* <form onSubmit={signButton}>
            <TextField
              fullWidth
              required
              inputRef={userEmailRef}
              type="email"
              label="Email"
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

            <Box mt={1.5} >
              <button type="submit" className="button">
                sign in
              </button>
              <button onClick={()=>navigate(-1)} type="button" className="reset">
                back
              </button>
            </Box>
            </form> */}

            <Box mt={2}>
            <div style={{width: '180px'}}>
              </div>
              <button type="submit" className="button" onClick={() => googleLogin()}>
                <p style={{display: "flex"}}><GoogleIcon style={{ marginRight: '30px'}}/> <span>Sign in with google</span></p>
              </button>
            </Box>
            {/* <p>No account? <span className="font-700"><Link className="link" to={'/signup'}>Create one</Link></span></p> */}
      </Paper>
      </Box>

    </Container>
  );
};

export default SignIn;
