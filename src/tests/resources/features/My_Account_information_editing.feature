@my_account_editing
Feature: My_Account_editing

  Background: User navigates to the Login page without logging-in
    Given user is at DemoShop HOME page
    Then user clicks Account icon at NAVIGATION BAR
    Then user clicks "Login" at Account dropdown menu
    Then user is redirected to "Account Login" page
    When user fills in login form with valid credentials
    And user clicks Login button below Login form
    Then user is redirected to "My Account" page
    When user sees sub menu on the "Right" side of the page
    Then user clicks "Edit Account" button in the sub menu
    Then user is redirected to "My Account Information" page

@negative_input_wa_email
@reset_user_credentials
  Scenario Outline: Account information editing, input field verification
    Then user fills in personal details editing form:
      | First Name | <FirstName>                      |
      | Last Name  | <LastName>                       |
      | E-Mail     | john.doe.testing!mail5@gmail.com |
      | Telephone  | <Telephone>                      |
    And user clicks Continue button below personal details editing form
    And user is redirected to "My Account Information" page
    And the following error messages are displayed:
      | <FirstNameErrorMessage> |
      | <LastNameErrorMessage>  |
      | <TelephoneErrorMessage> |
    And no other input error message is displayed
    Examples:
      | FirstName                         | LastName                          | Telephone                         | FirstNameErrorMessage                           | LastNameErrorMessage                           | TelephoneErrorMessage                          |
      | Jonthirtythreecharacterslonginput | Oldthirtythreecharacterslonginput | 012345678901234567890123456789123 | First Name must be between 1 and 32 characters! | Last Name must be between 1 and 32 characters! | Telephone must be between 3 and 32 characters! |
      |                                   |                                   | 01                                | First Name must be between 1 and 32 characters! | Last Name must be between 1 and 32 characters! | Telephone must be between 3 and 32 characters! |
      | Jonthirtythreecharacterslonginput | Oldthirtythreecharacterslonginput | 01234567890123456789012345678912  | First Name must be between 1 and 32 characters! | Last Name must be between 1 and 32 characters! |                                                |
      |                                   |                                   | 012                               | First Name must be between 1 and 32 characters! | Last Name must be between 1 and 32 characters! |                                                |
      | Johnthirtytwocharacterslonginput  | Oldthirtythreecharacterslonginput | 012345678901234567890123456789123 |                                                 | Last Name must be between 1 and 32 characters! | Telephone must be between 3 and 32 characters! |
      | J                                 |                                   | 01                                |                                                 | Last Name must be between 1 and 32 characters! | Telephone must be between 3 and 32 characters! |
      | Jonthirtythreecharacterslonginput | Bluethirtytwocharacterslonginput  | 012345678901234567890123456789123 | First Name must be between 1 and 32 characters! |                                                | Telephone must be between 3 and 32 characters! |
      |                                   | B                                 | 01                                | First Name must be between 1 and 32 characters! |                                                | Telephone must be between 3 and 32 characters! |

@negative_input_only_email
@reset_user_credentials
  Scenario Outline: Account information editing, e-mail field verification
    When input fields are prefilled with default users credentials
    Then user fills in personal details editing form:
      | First Name | John         |
      | Last Name  | Doe          |
      | E-Mail     | <E-Mail>     |
      | Telephone  | +37128310594 |
    And user clicks Continue button below personal details editing form
    And user is redirected to "My Account Information" page
    And an error message "<EmailErrorMessage>" is displayed
    And an e-mail validation warning message "<EmailValidationMessage>" is displayed
    And no other input error message is displayed
    Examples:
      | E-Mail                                                                                            | EmailErrorMessage                           | EmailValidationMessage                                                           |
      | johndoegmailcom                                                                                   |                                             | Please include an '@' in the email address. 'johndoegmailcom' is missing an '@'. |
      | @johndoegmailcom                                                                                  |                                             | Please enter a part followed by '@'. '@johndoegmailcom' is incomplete.           |
      | johndoegmailcom@                                                                                  |                                             | Please enter a part following '@'. 'johndoegmailcom@' is incomplete.             |
      | johndoe@gmailcom                                                                                  | E-Mail Address does not appear to be valid! |                                                                                  |
      | 1a!@1a!.1a!                                                                                       |                                             | A part following '@' should not contain the symbol '!'.                          |
      | 1a!@1a.1a                                                                                         | E-Mail Address does not appear to be valid! |                                                                                  |
      | 1@1.                                                                                              |                                             | '.' is used at a wrong position in '1.'.                                         |
      | 1@.a                                                                                              |                                             | '.' is used at a wrong position in '.a'.                                         |
      | @1.a                                                                                              |                                             | Please enter a part followed by '@'. '@1.a' is incomplete.                       |
      | x1!aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@1aaaaaaaaaaaaaaaaaaaaaaaaaaaa.a | E-Mail Address does not appear to be valid! |                                                                                  |
      | 1@x1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |                                             | Please enter an email address.                                                   |
      | 1@1aaaaaaaaaaaaaaaaaaaaaaaaaaaaa.xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |                                             | Please enter an email address.                                                   |

@negative_input_fields_mandatory
@reset_user_credentials
  Scenario Outline: Account information editing, Account information editing, are fields mandatory
    Then user fills in personal details editing form:
      | First Name | <FirstName> |
      | Last Name  | <LastName>  |
      | E-Mail     | <E-Mail>    |
      | Telephone  | <Telephone> |
    And user clicks Continue button below personal details editing form
    And user is redirected to "My Account Information" page
    And the following error messages are displayed:
      | <FirstNameErrorMessage> |
      | <LastNameErrorMessage>  |
      | <EmailErrorMessage>     |
      | <TelephoneErrorMessage> |
    And no other input error message is displayed
    Examples:
      | FirstName | LastName | E-Mail                           | Telephone  | FirstNameErrorMessage                           | LastNameErrorMessage                           | TelephoneErrorMessage                          | EmailErrorMessage                           |
      |           |          |                                  |            | First Name must be between 1 and 32 characters! | Last Name must be between 1 and 32 characters! | Telephone must be between 3 and 32 characters! | E-Mail Address does not appear to be valid! |
      |           | Doe      | john.doe.1231231231230@gmail.com | 0123456789 | First Name must be between 1 and 32 characters! |                                                |                                                |                                             |
      | John      |          | john.doe.1231231231230@gmail.com | 0123456789 |                                                 | Last Name must be between 1 and 32 characters! |                                                |                                             |
      | John      | Doe      |                                  | 0123456789 |                                                 |                                                |                                                | E-Mail Address does not appear to be valid! |
      | John      | Doe      | john.doe.1231231231230@gmail.com |            |                                                 |                                                | Telephone must be between 3 and 32 characters! |                                             |
