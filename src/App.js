import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const dataset = require("./data/sample.json");

const defaultTheme = createTheme();

const shuffle = (array) =>
  array
    .map((value) => [Math.random(), value])
    .sort(([a], [b]) => a - b)
    .map((entry) => entry[1]);

export default () => {
  const [data, setData] = React.useState(shuffle(dataset));
  const [answerVisible, setAnswerVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(0);

  const onNext = () => {
    setCurrent((current + 1) % data.length);
    setAnswerVisible(false);
  };
  const onShuffle = () => {
    setData(shuffle(dataset));
    setAnswerVisible(false);
    setCurrent(0);
  };
  const onShowAnswer = () => {
    setAnswerVisible(!answerVisible);
  };

  const answer = <div>A: {answerVisible ? data[current].answer : ""}</div>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Study
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="md" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    Q: {data[current].question}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {answer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={onShowAnswer}>
                Show answer
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={onNext}>
                Next
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={onShuffle}>
                Shuffle
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};
