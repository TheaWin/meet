/* eslint-disable semi */
import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import mockData from '../mock-data';

describe('<Event /> component',() => {
  let EventComponent;
  const event = mockData[0];

  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
    // queryByText = EventComponent.queryByText;
  })

  test('has event title', () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test('has event created time', () => {
    const formattedDate = new Date(event.created).toUTCString();
    expect(EventComponent.queryByText(formattedDate)).toBeInTheDocument();
  })

  test('has event location', () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test('has show details button', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  test('event details are collapsed by default', () => {
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  });

  test('user can expand detail sections when clicking "Show Details" button', async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    await user.click(button);
    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
  })

  test('user can hide detail sections when clicking "Hide Details" button', async () => {
    const user = userEvent.setup();
    const showButton= EventComponent.queryByText('Show Details');
    await user.click(showButton);
    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
    const hideButton = EventComponent.queryByText('Hide Details');
    await user.click(hideButton);
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  })
})
