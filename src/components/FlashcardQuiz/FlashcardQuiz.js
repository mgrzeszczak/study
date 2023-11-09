import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

const shuffle = (array) =>
  array
    .map((value) => [Math.random(), value])
    .sort(([a], [b]) => a - b)
    .map((entry) => entry[1]);

export default (props) => {
  const dataset = props.dataset;
  const [data, setData] = React.useState(shuffle(dataset));
  const [current, setCurrent] = React.useState(0);
  const [showReverse, setShowReverse] = React.useState(false);

  const onNext = () => {
    setCurrent((current + 1) % data.length);
    setShowReverse(false);
  };
  const onShuffle = () => {
    setData(shuffle(dataset));
    setCurrent(0);
    setShowReverse(false);
  };
  const onFlip = () => {
    setShowReverse(!showReverse);
  };

  const elem = data[current];
  console.log(elem);
  const content = showReverse ? elem.answer : elem.question;

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {showReverse ? "Answer" : "Question"}
          </Typography>
          <Typography variant="body2">{content}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" size="small" onClick={onFlip}>
            Flip
          </Button>
          <Button variant="outlined" size="small" onClick={onNext}>
            Next
          </Button>
          <Button variant="outlined" size="small" onClick={onShuffle}>
            Shuffle
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
