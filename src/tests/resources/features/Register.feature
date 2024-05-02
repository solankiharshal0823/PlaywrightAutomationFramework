@registration
Feature: Registration

  Background: User navigates to the Registration page without logging-in (QESDEMO-2735)
    Given user is at DemoShop HOME page
    And user is NOT logged in
    Then user clicks Account icon at NAVIGATION BAR
    Then user clicks "Register" at Account dropdown menu
    Then user is redirected to "Register Account" page

@negative_chekbox_and_taken_email
  Scenario: Validate registration form inputs - checkbox and taken e-mail warnings (QESDEMO-2757)
    When user fills in registration form with credentials:
      | First Name       | John                             |
      | Last Name        | Doe                              |
      | E-Mail           | john.doe.testing!mail4@gmail.com |
      | Telephone        |                        123456789 |
      | Password         |                       1Password! |
      | Password Confirm |                       1Password! |
    And user selects the No radiobutton from Subscription options
    Then user clicks Continue button below Registration form
    And a warning appears: " Warning: You must agree to the Privacy Policy!"
    And user checks Privacy Policy checkbox
    Then user clicks Continue button below Registration form
    And a warning appears: " Warning: E-Mail Address is already registered!"

@negative_mandatory_fields
  Scenario Outline: Validate registration form inputs - are fields mandatory (QESDEMO-2756)
    When user fills in registration form with credentials:
      | First Name       | <FirstName>        |
      | Last Name        | <LastName>         |
      | E-Mail           | <E-Mail>           |
      | Telephone        | <Telephone>        |
      | Password         | <Password>         |
      | Password Confirm | <Password Confirm> |
    Then user selects the No radiobutton from Subscription options
    Then user checks Privacy Policy checkbox
    Then user clicks Continue button below Registration form
    Then user remains on "Register Account" page
    Then the following error messages are displayed:
      | <FirstNameErrorMessage>       |
      | <LastNameErrorMessage>        |
      | <TelephoneErrorMessage>       |
      | <EmailErrorMessage>           |
      | <PasswordErrorMessage>        |
      | <PasswordConfirmErrorMessage> |
    And no other input error message is displayed
    Examples: 
      | FirstName | LastName | Telephone  | E-Mail                            | Password   | Password Confirm | FirstNameErrorMessage                           | LastNameErrorMessage                           | TelephoneErrorMessage                          | EmailErrorMessage                           | PasswordErrorMessage                          | PasswordConfirmErrorMessage                    |
      |           | Doe      | 0123456789 | john.doe.12312312531230@gmail.com | 1Password! |       1Password! | First Name must be between 1 and 32 characters! |                                                |                                                |                                             |                                               |                                                |
      | John      |          | 0123456789 | john.doe.12312312531230@gmail.com | 1Password! |       1Password! |                                                 | Last Name must be between 1 and 32 characters! |                                                |                                             |                                               |                                                |
      | John      | Doe      |            | john.doe.12312312531230@gmail.com | 1Password! |       1Password! |                                                 |                                                | Telephone must be between 3 and 32 characters! |                                             |                                               |                                                |
      | John      | Doe      | 0123456789 |                                   | 1Password! |       1Password! |                                                 |                                                |                                                | E-Mail Address does not appear to be valid! |                                               |                                                |
      | John      | Doe      | 0123456789 | john.doe.12312312531230@gmail.com |            |       1Password! |                                                 |                                                |                                                |                                             | Password must be between 4 and 20 characters! | Password confirmation does not match password! |
      | John      | Doe      | 0123456789 | john.doe.12312312531230@gmail.com | 1Password! |                  |                                                 |                                                |                                                |                                             |                                               | Password confirmation does not match password! |

@negative_email_field
  Scenario Outline: Validate registration form inputs - email field error messages and warnings (QESDEMO-2758, QESDEMO-2762)
    When user fills in registration form with credentials:
      | First Name       | John       |
      | Last Name        | Doe        |
      | E-Mail           | <E-Mail>   |
      | Telephone        | 0123456789 |
      | Password         | 1Password! |
      | Password Confirm | 1Password! |
    Then user selects the No radiobutton from Subscription options
    Then user checks Privacy Policy checkbox
    Then user clicks Continue button below Registration form
    Then user remains on "Register Account" page
    And an error message "<EmailErrorMessage>" is displayed
    And an e-mail validation warning message "<EmailValidationMessage>" is displayed
    And no other input error message is displayed

    Examples: 
      | E-Mail                                                                                            | EmailErrorMessage                           | EmailValidationMessage                                                           |
      | johndoegmailcom                                                                                   |                                             | Please include an '@' in the email address. 'johndoegmailcom' is missing an '@'. |
      | @johndoegmailcom                                                                                  |                                             | Please enter a part followed by '@'. '@johndoegmailcom' is incomplete.           |
      | johndoegmailcom@                                                                                  |                                             | Please enter a part following '@'. 'johndoegmailcom@' is incomplete.             |
      | johndoe@gmailcom                                                                                  | E-Mail Address does not appear to be valid! |                                                                                  |
      |                                                                                       1a!@1a!.1a! |                                             | A part following '@' should not contain the symbol '!'.                          |
      |                                                                                         1a!@1a.1a | E-Mail Address does not appear to be valid! |                                                                                  |
      |                                                                                              1@1. |                                             | '.' is used at a wrong position in '1.'.                                         |
      |                                                                                              1@.a |                                             | '.' is used at a wrong position in '.a'.                                         |
      | @1.a                                                                                              |                                             | Please enter a part followed by '@'. '@1.a' is incomplete.                       |
      | x1!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@1aaaaaaaaaaaaaaaaaaaaaaaaaaaa.a | E-Mail Address does not appear to be valid! |                                                                                  |
      | 1@x1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |                                             | Please enter an email address.                                                   |
      | 1@1aaaaaaaaaaaaaaaaaaaaaaaaaaaaa.xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |                                             | Please enter an email address.                                                   |
