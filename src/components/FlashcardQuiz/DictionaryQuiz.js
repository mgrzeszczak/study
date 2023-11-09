import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";

const shuffle = (array) =>
  array
    .map((value) => [Math.random(), value])
    .sort(([a], [b]) => a - b)
    .map((entry) => entry[1]);

export default (props) => {
  const dataset = props.dataset;
  const [data, setData] = React.useState(shuffle(dataset));
  const [answerVisible, setAnswerVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [dictAnswer, setDictAnswer] = React.useState("<loading>");

  axios
    .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + data[current])
    .then(function (response) {
      setDictAnswer(response.data[0].meanings[0].definitions[0].definition);
    })
    .catch(function (error) {
      setDictAnswer("<unknown>");
    });

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

  const answer = <div>A: {answerVisible ? dictAnswer : ""}</div>;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                Q: {data[current]}
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
    </>
  );
};
