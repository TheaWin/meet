# Meet App

## Overview
The Meet App will use serverless functions to fetch and filter public events from the Google Calendar API based on the user's selected city, manage the display of event details, and specify the number of events to show. These functions will handle real-time data processing, and scaling automatically to meet user demand. Also, the events will be displayed based on the location of the user’s interest, the serverless functions can easily integrate the geolocation service of the user’s choice as well as handling authentication with Google Calendar API.

![meet](https://github.com/TheaWin/meet/blob/main/image/meet.png)

## Features

### 1: Show/Hide Event Details
As a user, I should be able to show/hide event details so that I can view only the information I want to know and reduce screen clutter.

#### Scenario 1
An event element is collapsed by default
    Given the user is on the main page
    When the events are displayed
    Then the event details should be collapsed by default

#### Scenario 2
User can expand an event to see details
    Given the user is on the main page
    When the user clicks on the show detail button on an event
    Then the event details should be expanded
    And the show detail button will be changed to hide detail button

#### Scenario 3
User can collapse an event to hide details
    Given the event details are shown
    And the button for the event details is (hide details)
    When the user clicks the hide detail button of that event
    Then the event details should be collapsed again
    And the hide detail button will be changed to show detail button

### 2: Specify Number of Events
As a user, I should be able to specify the number of events so that I can control how many events are displayed at once.

#### Scenario 1
When user hasn’t specified a number, default number is 32
		Given the main page is open
		And the user has not specified the number of events to display
		When the user views the events list
		Then the default number for Number of Events input field should be 32
		And the default number of events in the list should be 32
  
#### Scenario 2
User can specify the number of events they want to display
		Given the main page is open
		When the user changes the value of Number of Events input field
		Then the list should update to match that number of events

### 3: Use the App When Offline
As a user, I should be able to use the app when offline so that I can access it wherever and whenever.

#### Scenario 1
Display a message if the user is offline
    Given the user is offline,
    When the user opens the app;
    Then a message should be displayed indicating that they are offline.

#### Scenario 2
Show cached events when offline
    Given the user is offline,
    When the user opens the app;
    Then previously cached events should be displayed.

#### Scenario 3
Update the event list when back online
    Given the user was offline and is now online,
    When the user reopens the app or refreshes the page,
    Then the event list should be updated with the latest information.
    
### 4:Add an App Shortcut to the Home Screen
As a user, I should be able to add an app shortcut to the home screen so that I can access the app easily and quickly.

#### Scenario
User adds an app shortcut to the home screen
    Given I am using the app on a mobile device
    When I choose the option to add a shortcut to the home screen
    Then a shortcut should be added to my home screen
    
### 5: Display Charts Visualizing Event Details
As a user, I should be able to display charts visualizing event details so that I can easily understand and analyze the events’ patterns and trends.

#### Scenario
User views charts visualizing event details
    Given I am viewing an event’s details
    When I navigate to the “Charts” section
    Then I should see charts that visualize patterns and trends related to the event

### 6: Filter Events By City
As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.

#### Scenario 1
When user hasn’t searched for a city, show upcoming events from all cities.
    Given user hasn’t searched for any city
    When the user opens the app
    Then the user should see the list of all upcoming events.

#### Scenario 2
User should see a list of suggestions when they search for a city.
    Given the main page is open
    When user starts typing in the city textbox
    Then the user should recieve a list of cities (suggestions) that match what they’ve typed

#### Scenario 3
User can select a city from the suggested list.
    Given user was typing “Berlin” in the city textbox
    And the list of suggested cities is showing
    When the user selects a city (e.g., “Berlin, Germany”) from the list
    Then their city should be changed to that city (i.e., “Berlin, Germany”)
    And the user should receive a list of upcoming events in that city

## Cloning Repository
Open your terminal and run the following.
```
git clone https://github.com/TheaWin/meet.git
```
## Contact

Thea Win - [mstheawin@gmail.com](mailto:mstheawin@gmail.com)
