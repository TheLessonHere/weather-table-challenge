import axiosRequest from "./axios.config";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY || "f2eaa8dbc501b4d176107d982e6078d3";

export const getCityWeather = async (zip) => await axiosRequest.get(`weather?zip=${zip}&appid=${apiKey}&units=imperial`);