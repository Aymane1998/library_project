import { Box } from '@mui/material'
import React from 'react'
import MenuAppBar from '../MenuAppBar/MenuAppBar';
import DictionnaryLayout from '../CountriesCards/DictionnaryLayout';

const DictionnaryPage = () => {
  return (
    <Box>
      <MenuAppBar />
      <DictionnaryLayout />
    </Box>
  );
};

export default DictionnaryPage;