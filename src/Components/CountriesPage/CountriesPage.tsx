import { Box } from '@mui/material'
import React from 'react'
import MenuAppBar from '../MenuAppBar/MenuAppBar';
import CountriesCards from '../CountriesCards/CountriesCards';

const CountriesPage = () => {
  return (
    <Box>
    <MenuAppBar/>
    <CountriesCards/>
  </Box>
  )
  ;
}

export default CountriesPage