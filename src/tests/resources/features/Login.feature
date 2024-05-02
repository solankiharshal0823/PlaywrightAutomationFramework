@login
Feature: Login

  Background: User navigates to the Login page without logging-in
    Given user is at DemoShop HOME page
    Then user clicks Account icon at NAVIGATION BAR
    Then user clicks "Login" at Account dropdown menu
    Then user is redirected to "Account Login" page

  @positive
  Scenario: Login form positive
    When user fills in login form with valid credentials
    And user clicks Login button below Login form
    Then user is redirected to "My Account" page

  @negative
  Scenario Outline: Login form validation negative
    When user fills in login form with credentials:
      | E-Mail   | <E-Mail>   |
      | Password | <Password> |
    Then user clicks Login button below Login form
    And a warning appears: " <WarningMessage>"
    And user remains on "Account Login" page

    Examples: 
      | E-Mail                           | Password   | WarningMessage                                                                                   |
      |                                  |            | Warning: No match for E-Mail Address and/or Password.                                            |
      | john.doe.testing!mail9@gmail.com |            | Warning: No match for E-Mail Address and/or Password.                                            |
      |                                  | 1Password! | Warning: Your account has exceeded allowed number of login attempts. Please try again in 2 hour. |
      | john.doe.testing!mail8@gmail.com | 2Password! | Warning: No match for E-Mail Address and/or Password.                                            |
      | john.doe.testing!mail8@gmail.com | 3Password! | Warning: No match for E-Mail Address and/or Password.                                            |
      | john.doe.testing!mail8@gmail.com | 4Password! | Warning: No match for E-Mail Address and/or Password.                                            |
      | john.doe.testing!mail8@gmail.com | 5Password! | Warning: No match for E-Mail Address and/or Password.                                            |
      | john.doe.testing!mail8@gmail.com | 6Password! | Warning: No match for E-Mail Address and/or Password.                                            |
      | john.doe.testing!mail8@gmail.com | 7Password! | Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour. |
