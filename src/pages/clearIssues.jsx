import { Container, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import TimelineCard from '../components/UI/timelineCard'
import Loader from '../components/UI/loader/Loader'
import useFetch from '../components/hooks/useFetch'
import Menu from '../components/UI/Menu'
import { Helmet } from 'react-helmet'
import { loginDetails, userDetails } from '../components/loginDetails'

const ClearIssues = ({setOpenComment, search, setSearch}) => {

  const login  = loginDetails.login
  const dataFetch = login ? `${process.env.REACT_APP_API}/post?status=closed&email=${userDetails.email}` : `${process.env.REACT_APP_API}/post?status=closed`

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
            <title>CFBS - Cleared</title>
            <meta name="title" content="Cleared issues timeline" />
        </Helmet>

       <Grid container md={8} item display={'block'}>
       <Container maxWidth={matches && "sm"}>
        <p className='medium font-600'>Cleared issues</p>
        <br/>
        {timelineCardData.length === 0 && !pending && <p className='medium font-400'>No cleared issues found</p>}
        {pending && <Loader/>}
        {timelineData.map((data, i) => <TimelineCard key={i} data={data} id={i} setOpenComment={setOpenComment} />)}
        </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
    </Grid>
  )
}

export default ClearIssues