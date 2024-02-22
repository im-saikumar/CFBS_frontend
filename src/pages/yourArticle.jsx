import { Container, Grid, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Menu from '../components/UI/Menu'
import Loader from '../components/UI/loader/Loader'
import SavedCard from '../components/UI/SavedCard'
import useFetch from '../components/hooks/useFetch'
import { useNavigate } from 'react-router'
import { loginDetails, userDetails } from '../components/loginDetails'
import { Helmet } from 'react-helmet'

const MyArticle = ({setOpenComment}) => {

  const navigate = useNavigate();
  const login  = loginDetails.login

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])

  const[reload, setReload] = useState(false)
  const {data : totalData , pending, error} = useFetch(`${process.env.REACT_APP_API}/your_articles?email=${userDetails.email}` ,reload)
  error && alert(error)

  const yourArticleData = totalData

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Grid mt={8} mb={5} container item marginX={1} className="flex">

        <Helmet>
            <title>CFBS - My Articles</title>
            <meta name="title" content="your article stories" />
        </Helmet>

        <Grid container md={8} item display={"block"}>

      <Container maxWidth={matches && "sm"}>
        <p className='medium font-600'>My Article</p>
        <br/>
        {yourArticleData.length === 0 && !pending && <p className='medium font-400'>No Articles are found</p>}
        <Grid container flexDirection={'row'} item columnSpacing={2} rowSpacing={2}>
          {pending && <Loader/>}
          {!pending && yourArticleData.length !== 0 && 
          yourArticleData.map((data, i) => <SavedCard key={i} data={data} id={i} setOpenComment={setOpenComment} setReload={setReload} />)}
        </Grid>
      </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
    </Grid>
  )
}

export default MyArticle