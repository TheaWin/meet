/* eslint-disable semi */
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const fetchData = async () => {
    try {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className='App'>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
}

export default App;
