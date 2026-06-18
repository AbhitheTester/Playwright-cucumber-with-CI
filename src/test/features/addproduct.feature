Feature: Able to add product to cart and place order successfully

  @regression @cart
  Scenario Outline: Add product to cart and place order successfully
    Given User is on Login Page
    When User enters username from environment
    And User enters password from environment
    And User clicks on login button
    And User is on Dashboard Page
    And user searches for product "<productname>"
    And user adds product to cart
    Then cart count should be greater than 0

    Examples:
      | productname    |
      | iphone 13 pro  |
      | ZARA COAT 3    |
