Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default
    Given the user is on the main page
    When the events are displayed
    Then the event details should be collapsed by default

  Scenario: User can expand an event to see details
    Given the user is on the main page
    When the user clicks on the show detail button on an event
    Then the event details should be expanded
    And the show detail button will be changed to hide detail button

  Scenario: User can collapse an event to hide details
    Given the event details are shown
    And the button for the event details is (hide details)
    When the user clicks the hide detail button of that event
    Then the event details should be collapsed again
    And the hide detail button will be changed to show detail button
