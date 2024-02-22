import React from "react";
import TimelineCard from "../components/UI/timelineCard";
import { Container, Grid, useMediaQuery } from "@mui/material";
import useFetch from "../components/hooks/useFetch";
import Loader from "../components/UI/loader/Loader";
import Menu from "../components/UI/Menu";
import { Helmet } from "react-helmet";
import { loginDetails, userDetails } from "../components/loginDetails";


const Home = ({setOpenComment, search, setSearch}) => {

  const login  = loginDetails.login
  const dataFetch = login ? `${process.env.REACT_APP_API}/post?status=pending&email=${userDetails.email}` : `${process.env.REACT_APP_API}/post?status=pending`

  const {data : timelineCardData , pending , error} = useFetch(dataFetch)
  
  const timelineData = timelineCardData.filter((value) => 
    (value.state.toLowerCase().includes(search.toLowerCase()))|| 
    (value.district.toLowerCase().includes(search.toLowerCase()))
  )
  error && alert(error)

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Grid mt={8} mb={5} container item marginX={1} className="flex">
        <Helmet>
            <title>CFBS - Home</title>
            <meta name="title" content="pending timeline" />
            <meta name="main title" content="Cause For Better Society" />
        </Helmet>

      <Grid container md={8} item display={"block"}>
      <Container maxWidth={matches && "sm"} >
        <p className='medium font-600'>Your timeline</p>
        <br/>
        {timelineCardData.length === 0 && !pending && <p className='medium font-400'>No pending issues found</p>}
        {pending && <Loader/>}
        {timelineData.map((data, i) => <TimelineCard key={i} data={data} setOpenComment={setOpenComment} />)}
      </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
    </Grid>
  );
};

export default Home;
