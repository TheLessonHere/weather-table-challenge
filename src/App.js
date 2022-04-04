import React, { useState } from 'react';
import {
  BackgroundProvider,
  Header,
  WeatherDataGrid
} from "components";

function App() {
  // Light and Dark themes added for some spice
  const [lightTheme, setLightTheme] = useState(false);
  const toggleLightTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    <BackgroundProvider height="100vh" lightTheme={lightTheme}>
      <Header lightTheme={lightTheme} toggleTheme={toggleLightTheme} />
      <WeatherDataGrid lightTheme={lightTheme} />
    </BackgroundProvider>
  );
}

export default App;
