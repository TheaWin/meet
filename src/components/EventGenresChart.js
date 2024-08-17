/* eslint-disable semi */
import { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const colors = ['#8884d8', '#a9a7e5', '#c4c2e9', '#7b7fd0', '#b2b5e8'];

  const isSmallScreen = window.innerWidth < 600;
  const outerRadius = isSmallScreen ? 80 : 130;

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = genres.map(genre => {
      const filteredEvents = events.filter(event => event.summary.includes(genre));
      return {
        name: genre,
        value: filteredEvents.length
      }
    });
    return data;
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{fontSize: '13px', whiteSpace: 'pre-wrap' }}
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="100%" height={isSmallScreen ? 300 : 400}>
      <PieChart margin={{
        top: 0,
        right: 40,
        bottom: 15,
        left: 70,
      }}>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={outerRadius}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;
