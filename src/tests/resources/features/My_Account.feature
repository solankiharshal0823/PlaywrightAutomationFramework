@my_account
Feature: My_Account

  Background: User navigates to the Login page without logging-in
    Given user is at DemoShop HOME page
    Then user clicks Account icon at NAVIGATION BAR
    Then user clicks "Login" at Account dropdown menu
    Then user is redirected to "Account Login" page
    When user fills in login form with valid credentials
    And user clicks Login button below Login form
    Then user is redirected to "My Account" page

@right_menu_outline
  Scenario Outline: My Account page validation, right side sub-menu verification
    When user sees sub menu on the "Right" side of the page
    And only the following links are present:
      | Edit Account       |
      | My Account         |
      | Password           |
      | Address Book       |
      | Wish List          |
      | Order History      |
      | Downloads          |
      | Recurring payments |
      | Reward Points      |
      | Returns            |
      | Transactions       |
      | Newsletter         |
      | Logout             |
    And user clicks "<Sub Menu Option>" button in the sub menu
    Then user is redirected to "<Page Title>" page
    Examples:
      | Sub Menu Option    | Page Title              |
      | Edit Account       | My Account Information  |
      | My Account         | My Account              |
      | Password           | Change Password         |
      | Address Book       | Address Book            |
      | Wish List          | My Wish List            |
      | Order History      | Order History           |
      | Downloads          | Account Downloads       |
      | Recurring payments | Recurring Payments      |
      | Reward Points      | Your Reward Points      |
      | Returns            | Product Returns         |
      | Transactions       | Your Transactions       |
      | Newsletter         | Newsletter Subscription |
      | Logout             | Account Logout          |

@left_menu_outline
  Scenario Outline: My Account page validation, left side section verification
    When user sees menu on the "Left" side of the page
    And only the following sections are present:
      | My Account           |
      | My Orders            |
      | My Affiliate Account |
      | Newsletter           |
    And section "My Account" contains only the following options:
      | Edit your account information    |
      | Change your password             |
      | Modify your address book entries |
      | Modify your wish list            |
    And section "My Orders" contains only the following options:
      | View your order history   |
      | Downloads                 |
      | Your Reward Points        |
      | View your return requests |
      | Your Transactions         |
      | Recurring payments        |
    And section "My Affiliate Account" contains only the following options:
      | Register for an affiliate account |
    And section "Newsletter" contains only the following options:
      | Subscribe / unsubscribe to newsletter |
    And in section "<Section>" user clicks "<Section Option>"
    Then user is redirected to "<Page Title>" page
    Examples:
      | Section              | Section Option                        | Page Title                 |
      | My Account           | Edit your account information         | My Account Information     |
      | My Account           | Change your password                  | Change Password            |
      | My Account           | Modify your address book entries      | Address Book               |
      | My Account           | Modify your wish list                 | My Wish List               |
      | My Orders            | View your order history               | Order History              |
      | My Orders            | Downloads                             | Account Downloads          |
      | My Orders            | Your Reward Points                    | Your Reward Points         |
      | My Orders            | View your return requests             | Product Returns            |
      | My Orders            | Your Transactions                     | Your Transactions          |
      | My Orders            | Recurring payments                    | Recurring Payments         |
      | My Affiliate Account | Register for an affiliate account     | Your Affiliate Information |
      | Newsletter           | Subscribe / unsubscribe to newsletter | Newsletter Subscription    |
