import { GoogleLogin } from "@react-oauth/google";

const clientId =
  "782661790171-ekenre4fc5mr7fjuqtogvrp9k8ur0i4b.apps.googleusercontent.com";

  function handleSuccess(response) {
    // Access user profile information
    const user = response.profileObj;
    console.log(user.name, user.email, user.picture);
  
    // Store user data or tokens securely (ideally on the server-side)
  }
  
  function handleFailure(error) {
    console.error('Authentication failed:', error);
  }

function Login() {
    return (
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        redirectUri={window.location.origin + '/oauth2/callback'}
      />
  );
}


export default Login