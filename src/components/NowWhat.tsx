import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export default () => {

  const [heartBeat, setHeartBeat] = useState(0);
  const requestData = {"query":" query{  heartBeat }"}
  const classes = useStyles();

  useEffect(() => {
  fetch('https://react.eogresources.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:',data.data.heartBeat, data);
    setHeartBeat(data.data.heartBeat);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
},[]);
  return (
    <Card className={classes.card}>
      <CardHeader title="OK, sai sirisha, you're all setup. Now What?" />
      <CardContent>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {heartBeat}
        <List>
          <ListItem>
            <Avatar>1</Avatar>
            <ListItemText primary="Explore the GraphQL API" />
          </ListItem>
          <ListItem>
            <Avatar>2</Avatar>
            <ListItemText primary="Add ability to select Metrics" />
          </ListItem>
          <ListItem>
            <Avatar>3</Avatar>
            <ListItemText primary="Display the current metric data" />
          </ListItem>
          <ListItem>
            <Avatar>4</Avatar>
            <ListItemText primary="Chart historical metric data" />
          </ListItem>
          <ListItem>
            <Avatar>5</Avatar>
            <ListItemText primary="Submit Your App" />
          </ListItem>
        </List>

        <Typography variant="body1">
          Remember to refer to our <a href="https://react.eogresources.com/assessing">How We Assess Submissions</a>{' '}
          guidelines, as well as the <a href="https://react.eogresources.com/api">GraphQL API Documentation</a>.
        </Typography>
      </CardContent>
    </Card>
  );
};
