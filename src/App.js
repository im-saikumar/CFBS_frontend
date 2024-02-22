import "./App.css";
import Navbar from "./components/nav/nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NoPage from "./pages/nopage";
import { Container } from "@mui/material";
import CreatePost from "./pages/createPost";
import PostDetails from "./pages/post";
import About from "./pages/about";
import Contact from "./pages/contact";
import ClearedIssues from "./pages/clearIssues";
import Profile from "./pages/profile";
import SavedPost from "./pages/SavedPost";
import MyArticles from "./pages/yourArticle";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import Notifications from "./pages/notifications";
import { clientId } from "./components/loginDetails";

function App() {

  const [openComment, setOpenComment] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Navbar setSearch={setSearch} />
        <Container maxWidth="lg">
          <Routes>
            <Route index element={<Home setOpenComment={setOpenComment} search={search} setSearch={setSearch}/>} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetails openComment={openComment} setOpenComment={setOpenComment} />} />
            <Route path="/saved" element={<SavedPost setOpenComment={setOpenComment} />} />
            <Route path="/articles" element={<MyArticles setOpenComment={setOpenComment} />} />

            <Route path="/notifications" element={<Notifications setOpenComment={setOpenComment} /> } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clearedissues" element={<ClearedIssues setOpenComment={setOpenComment} search={search} setSearch={setSearch}/>} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/signin" element={<SignIn />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}

            <Route path="*" element={<NoPage />} />
                
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
