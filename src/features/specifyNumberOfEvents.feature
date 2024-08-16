Feature: Specify Number of Events
	Scenario: When user hasn’t specified a number, default number is 32
		Given the main page is open
		And the user has not specified the number of events to display
		When the user views the events list
		Then the default number for Number of Events input field should be 32
		And the default number of events in the list should be 32

	Scenario: User can specify the number of events they want to display
		Given the main page is open
		When the user changes the value of Number of Events input field
		Then the list should update to match that number of events