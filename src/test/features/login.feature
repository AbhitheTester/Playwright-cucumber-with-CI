Feature: Login

@smoke @login
Scenario: Successful Login

Given User is on Login Page
And User enters username from environment
And User enters password from environment
And User clicks on login button
Then User is on Dashboard Page
