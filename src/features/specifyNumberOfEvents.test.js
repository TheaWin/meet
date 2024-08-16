/* eslint-disable semi */
import { render, within, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { loadFeature, defineFeature } from "jest-cucumber"
import App from "../App"
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, default number is 32', ({ given, and, when, then }) => {
    let AppDOM;
    given('the main page is open', () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    and('the user has not specified the number of events to display', () => {
    });

    let EventListItems;
    when('the user views the events list', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      })
    });

    then(/^the default number for Number of Events input field should be (\d+)$/, (arg0) => {
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      const numberofEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
      expect(numberofEventsInput.value).toBe('32');
    });

    and(/^the default number of events in the list should be (\d+)$/, (arg0) => {
      expect(EventListItems.length).toBe(32);
    });
  });

  test('User can specify the number of events they want to display', ({ given, when, then }) => {
    let AppDOM;
    given('the main page is open', () => {
      const AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when('the user changes the value of Number of Events input field', async () => {
      const user = userEvent.setup();
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      const numberofEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
      await user.type(numberofEventsInput, "{backspace}{backspace}10");
      expect(numberofEventsInput.value).toBe('10');
    });

    then('the list should update to match that number of events', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10);
      })
    });
  });
})
