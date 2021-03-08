import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from './CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

export default () => {

  const [heartBeat, setHeartBeat] = useState(0);
  const requestData = {"query":" query{  heartBeat }"}
  const classes = useStyles();
  let data: { name: string, uv: number}[] = [];
  const [chart, setChartData] = useState(data);
 const sampleData = [
  {
    name: 'HeartBeat 1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'HeartBeat 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'HeartBeat 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'HeartBeat 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'HeartBeat 5',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'HeartBeat 6',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'HeartBeat 7',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

  useEffect(() => {
    const interval =  setInterval(() => fetch('https://react.eogresources.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  .then(response => response.json())
  .then(resp => {
    console.log('Success:',resp.data);
    data.push({ name: 'heartBeat', uv: resp.data.heartBeat });
   setChartData(data);
    setHeartBeat(resp.data.heartBeat);
  })
  .catch((error) => {
    console.error('Error:', error);
  }), 1300);
  return () => clearInterval(interval);
},[]);
console.log('chart', chart);
  return (
    <Card className={classes.card}>
      <CardHeader title="OK, sai sirisha, you're all setup. Now What?" />
      <CardContent>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {chart}
        {heartBeat}
        {/* <LineChart width={500} height={300} data={chart}> */}
        <LineChart width={500} height={300} data={sampleData}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
  </LineChart>
     
      </CardContent>
    </Card>
  );
};
