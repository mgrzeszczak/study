import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FlashcardQuiz from "../FlashcardQuiz/FlashcardQuiz";
import DictionaryQuiz from "../FlashcardQuiz/DictionaryQuiz";

const defaultTheme = createTheme();

const HomeScreen = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Link to="/gcp-architect">
          <Button variant="outlined" fullWidth>
            GCP Architect
          </Button>
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link to="/english">
          <Button variant="outlined" fullWidth>
            English
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

const StudyAppBar = () => {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");
  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={navigateHome}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Study
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
const data = require("../../data/gcp-dataset.json");
const words = require("../../data/words.json");

export default () => {
  return (
    <BrowserRouter basename="study">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <StudyAppBar />
        <main>
          <Container maxWidth="md" sx={{ p: 2 }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/gcp-architect"
                element={<FlashcardQuiz dataset={data} />}
              />
              <Route
                path="/english"
                element={<DictionaryQuiz dataset={words} />}
              />
            </Routes>
          </Container>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
};
