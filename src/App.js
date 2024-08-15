/* eslint-disable semi */
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import Event from './components/Event';

import './App.css';

const App = () => {
  return (
    <div className='App'>
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
