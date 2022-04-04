import React, { useState, useEffect, useCallback } from 'react';
import { WEATHER } from "api";
import { cityList } from "utils";
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

const GridContainer = styled.div`
    height: 400px;
    width: 100%;
    max-width: 900px;
    background: transparent;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 100%;
    max-width: 900px;
    background: #ffca7a;
    margin: 0 32px;
    border-radius: 2px;
`;

const WeatherDataGrid = ({ lightTheme }) => {
    // Create state to store weather data
    const [weatherData, setWeatherData] = useState([]);
    // Create loading state
    const [loading, setLoading] = useState(false);

    // useCallback to gather weather data of the 20 most populated US cities (updates if the list changes)
    const getData = useCallback(async () => {
        setLoading(true);
        // create array to store data from each call
        let cityData = [];
        // loop through all the cities in the list
        for(const city of cityList) {
            try {
                // for each city make an async call to get its weather data and push all the data into the array
                const { data } = await WEATHER.getCityWeather(city.zip);
                data ? cityData.push({
                    ...city,
                    weatherData: data
                }) : cityData.push({
                    ...city,
                    weatherData: null
                })
            } catch (err) {
                // Otherwise log the error if the API call fails
                console.log(err)
            }
        }
        // set our weather data state
        setWeatherData(cityData);
        setLoading(false);
    }, []);

    useEffect(() => {
        // useEffect makes API calls on load or if the list of cities changes
        getData();
    }, [getData]);

    // define our columns
    const columns = [
        {
            field: 'rank',
            headerName: 'Pop. Rank',
            width: 100
        },
        {
            field: "name",
            headerName: 'City Name',
            width: 150
        },
        {
            field: "zip",
            headerName: 'Zip Code',
            width: 150
        },
        {
            field: "temperature",
            headerName: 'Temperature',
            width: 150
        },
        {
            field: "humidity",
            headerName: 'Humidity',
            width: 150
        },
        {
            field: "pressure",
            headerName: 'Pressure',
            width: 150
        },
    ];

    // Create a function that returns an array of rows based off of our weather data.
    // This could be avoided by being more selective in our callback function above,
    // however, I don't think this form of data sorting/storing is too strenuous or space complex,
    // so I'll just do it this way for now. Just a note that I would consider changing this
    // in the future if performence needs required it.
    const determineRows = (data) => {
        return data.map((datum, idx) => ({
            id: idx,
            rank: datum.rank,
            name: datum.name,
            zip: datum.zip,
            temperature: `${datum.weatherData?.main.temp}°F`,
            humidity: `${datum.weatherData?.main.humidity}%`,
            pressure: `${datum.weatherData?.main.pressure}hPa`,
        }))
    };

    const determineStyles = (lightTheme) => ({
        border: "none",
        backgroundColor: '#ffca7a',
        marginLeft: "32px",
        '& .MuiDataGrid-columnHeaders': {
            backgroundColor: lightTheme ? "#f56038" : "#12492f",
            color: lightTheme ? "black" : "white",
            borderBottom: "1px solid black"
        },
        '& .MuiDataGrid-iconSeparator': {
            color: lightTheme ? "black" : "white",
        },
        '& .MuiDataGrid-row': {
            borderBottom: "none"
        },
        '& .MuiDataGrid-cell': {
            borderBottom: "1px solid black"
        },
        '& .MuiDataGrid-footerContainer': {
            borderTop: "1px solid black"
        },
    })

    return (
        <GridContainer>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress
                        sx={{
                            color: lightTheme ? "#f56038" : "#12492f"
                        }}
                        size={64}
                    />
                </LoadingContainer>
            ) : (
                <DataGrid
                    rows={determineRows(weatherData)}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={determineStyles(lightTheme)}
                    disableSelectionOnClick
                    disableColumnMenu
                />
            )}
        </GridContainer>
    )
}

export default WeatherDataGrid;