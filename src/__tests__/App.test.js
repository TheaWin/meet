/* eslint-disable semi */
import { render } from '@testing-library/react';
import App from '../App';

/* describe('test Event props', () => {
  beforeEach(() => {
    initEventProps();
  });

  afterEach(() => {
    clearEventProps();
  });

  test('description 1', () => { some code });
  test('description 2', () => { some code });

}); */

describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render Number of Events', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  })
});
