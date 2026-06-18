Feature: Login

@smoke @login
Scenario: Successful Login

Given User is on Login Page
And User logs in with selected role
And User clicks on login button
Then User is on Dashboard Page
