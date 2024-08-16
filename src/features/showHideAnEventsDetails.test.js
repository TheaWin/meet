/* eslint-disable semi */
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the main page', () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;
    when('the events are displayed', async () => {
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    then('the event details should be collapsed by default', async () => {
      await waitFor(() => {
        EventListItems.forEach(eventListItem => {
          expect(eventListItem.querySelector('.details')).not.toBeInTheDocument();
        });
      });
    });
  });

  test('User can expand an event to see details', ({ given, and, when, then }) => {
    let AppComponent;
    given('the user is on the main page', () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListItems;
    when('the user clicks on the show detail button on an event', async () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      let detailsBtn;
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('Show Details');
      });
      await user.click(detailsBtn);
    });

    then('the event details should be expanded', () => {
      const details = EventListItems[0].querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    and('the show detail button will be changed to hide detail button', () => {
      const detailsBtn = within(EventListItems[0]).queryByText('Hide Details');
      expect(detailsBtn.textContent).toBe('Hide Details');
    });
  });

  test('User can collapse an event to hide details', ({ given, and, when, then }) => {
    let AppDOM;
    let EventListItems;
    let detailsBtn;
    given('the event details are shown', async () => {
      const user = userEvent.setup();
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        detailsBtn = within(EventListItems[0]).queryByText('Show Details');
      })
      await user.click(detailsBtn);
      expect(EventListItems[0].querySelector('.details')).toBeInTheDocument();
    });

    and('the button for the event details is (hide details)', () => {
      expect(detailsBtn.textContent).toBe('Hide Details');
    });

    when('the user clicks the hide detail button of that event', async () => {
      const user = userEvent.setup();
      await user.click(detailsBtn);
    });

    then('the event details should be collapsed again', () => {
      expect(EventListItems[0].querySelector('.details')).not.toBeInTheDocument();
    });

    and('the hide detail button will be changed to show detail button', () => {
      expect(detailsBtn.textContent).toBe('Show Details');
    });
  });
});
