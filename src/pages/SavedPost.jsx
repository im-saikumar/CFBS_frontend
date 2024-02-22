import { Container, Grid, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Menu from '../components/UI/Menu'
import SavedCard from '../components/UI/SavedCard'
import useFetch from '../components/hooks/useFetch'
import Loader from '../components/UI/loader/Loader'
import { useNavigate } from 'react-router'
import { loginDetails, userDetails } from '../components/loginDetails'

const SavedPost = ({setOpenComment}) => {

  const navigate = useNavigate();
  const login  = loginDetails.login

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])

  const[reload, setReload] = useState(false)

  const {data : savedCardData , pending, error } = useFetch(`${process.env.REACT_APP_API}/your_saved?email=${userDetails.email}`, reload)
  error && alert(error)

  const matches = useMediaQuery('(min-width:900px)');


  return (
    <Grid mt={8} mb={5} container item marginX={1} className="flex">
      <Grid container md={8} item display={"block"}>
      <Container maxWidth={matches && "sm"}>
        <p className='medium font-600'>Saved Posts</p>
        <br/>
        {savedCardData.length === 0 && !pending && <p className='medium font-400'>No saved posts found</p>}
        <Grid container flexDirection={'row'} item columnSpacing={2} rowSpacing={2}>
        {pending && <Loader/>}
        {!pending && savedCardData.length !== 0 && savedCardData.map((data, i) => <SavedCard key={i} data={data} setReload={setReload} setOpenComment={setOpenComment} />)}
        </Grid>
      </Container>
      </Grid>
      <Grid md={4} item display={"block"} pt={3}>
        <Menu />
      </Grid>
    </Grid>
  )
}

export default SavedPost