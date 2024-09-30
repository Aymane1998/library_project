import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCountriesAsync } from '../../store/country/countryAsync';
import { ReduxStatus } from '../../utils/types/reduxStatusValues';
import { Country } from '../../utils/types/Country';

const CountriesCards: React.FC = () => {
  const dispatch = useAppDispatch();
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const theme = useTheme();
  const regions = ['Africa', 'Europe', 'Asia', 'America', 'Oceania'];
  const getCountriesRequest = useAppSelector(
    (state) => state.country.getCountries
  );

  useEffect(() => {
    dispatch(getCountriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (getCountriesRequest.status === ReduxStatus.Succeeded) {
      setCountries(getCountriesRequest.data);
    }
  }, [getCountriesRequest]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleRegionChange = (event: SelectChangeEvent<string>) => {
    setRegion(event.target.value); // Update the region state
    console.log('region', event.target.value);
  };

  // Calculate the filtered countries based on search and region
  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region ? country.region === region : true)
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? '#424242' : '#f0f0f0',
              '& .MuiOutlinedInput-root': {
                color: theme.palette.text.primary,
                '& fieldset': {
                  borderColor: theme.palette.divider,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.text.secondary,
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel
              id="region-select-label"
              sx={{ color: theme.palette.text.primary }}
            >
              Filter by Region
            </InputLabel>
            <Select
              labelId="region-select-label"
              id="region-select"
              value={region}
              label="Filter by Region"
              onChange={handleRegionChange} // Now using the correct event type
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? '#424242' : '#f0f0f0',
                color: theme.palette.text.primary,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.text.secondary,
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems="stretch">
        {filteredCountries.map((country) => (
          <Grid item xs={12} sm={6} md={3} key={country.id}>
            <Card
              sx={{
                height: '100%',
                background: theme.palette.background.default,
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={country.flags.png}
                  alt={`${country.name.common} flag`}
                  sx={{
                    maxHeight:'260px',
                    width: '100%', // Ensure the image takes up the full width of the container
                    objectFit: 'contain', // Ensure the entire image is shown without cropping
                  }}
                />

                <CardContent>
                  <Typography
                    sx={{ fontWeight: 600 }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Population: {country.population}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Region: {country.region}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Capital: {country.capital}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Learn more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountriesCards;
