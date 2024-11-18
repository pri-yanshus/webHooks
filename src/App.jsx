import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Broadcast from "./pages/Broadcast";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2", // Blue shade for primary color
      },
      common: {
        white: "#ffffff", // White color
      },
      action: {
        hover: "#f5f5f5", // Light gray for hover state
      },
    },
    spacing: (factor) => `${0.25 * factor}rem`, // Define spacing, default multiplier
  });
  return (
    <Routes>
      <Route path="/" element={<NavBar />} />
      <Route
        path="/broadcast"
        element={
          <ThemeProvider theme={theme}>
            <Broadcast />
          </ThemeProvider>
        }
      />
    </Routes>
  );
}

export default App;
