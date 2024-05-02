@purchase
Feature: Purchase

  Background: User navigates to the Login page without logging-in
    Given user is at DemoShop HOME page
    Then user clicks Account icon at NAVIGATION BAR
    Then user clicks "Login" at Account dropdown menu
    Then user is redirected to "Account Login" page
    When user fills in login form with valid credentials
    And user clicks Login button below Login form
    Then user is redirected to "My Account" page

  @positive
  Scenario Outline: Phone purchase flow, first time purchase
    When user clicks on Phones & PDAs menu option
    And user is redirected to "Desktops" page
    Then user clicks on ADD TO CART button for product "<Product Name>"
    Then user clicks on Shopping Cart in Navigation bar
    And user is redirected to "Shopping Cart" page
    Then user sees product "<Product Name>" on the page it has following credentials:
      | Product Name | <Product Name> |
      | Quantity     | <Quantity>     |
      | Unit Price   | <Sum>          |
      | Total        | <Sum>          |
    Then user sees the sub-total table and it has following credentials:
      | Sub-Total:       | <Sub-Total> |
      | Eco Tax (-2.00): | <Eco Tax>   |
      | VAT (20%):       | <VAT>       |
      | Total:           | <Sum>       |
    Then user clicks the Checkout button at the bottom of the Shopping Cart page
    And user is redirected to "Checkout" page
    Then user selects option in Billing Details: I want to use a new address
    And user fills in the new Billing address form with following credentials:
      | First Name     | <Billing Name>      |
      | Last Name      | <Billing Surname>   |
      | Company        | <Billing Company>   |
      | Address 1      | <Billing Address1>  |
      | Address 2      | <Billing Address2>  |
      | City           | <Billing City>      |
      | Post Code      | <Billing Post Code> |
      | Country        | <Billing Country>   |
      | Region / State | <Billing Region>    |
    Then user clicks the Continue button at the bottom of the Billing Details form
    Then user selects option in Delivery Details: I want to use a new address
    And user fills in the new Delivery address form with following credentials:
      | First Name     | <Delivery Name>      |
      | Last Name      | <Delivery Surname>   |
      | Company        | <Delivery Company>   |
      | Address 1      | <Delivery Address1>  |
      | Address 2      | <Delivery Address2>  |
      | City           | <Delivery City>      |
      | Post Code      | <Delivery Post Code> |
      | Country        | <Delivery Country>   |
      | Region / State | <Delivery Region>    |
    Then user clicks the Continue button at the bottom of the Delivery Details form
    Then user selects in Delivery Method: Flat Shipping Rate - $5.00
    And user types Delivery comment "<Billing Comment>"
    Then user clicks the Continue button at the bottom of the Delivery Method form
    Then user selects in Payment Method: Cash On Delivery
    And user types Payment comment "<Delivery Comment>"
    Then user ticks-in checkbox: I have read and agree to the Terms & Conditions
    And user clicks the Continue button at the bottom of the Payment Method form
    Then user sees the subtotal table and it has following product credentials:
      | Product Name | <Product Name> |
      | Quantity     | <Quantity>     |
      | Unit Price   | <Sub-Total>    |
      | Total        | <Sub-Total>    |
    And user sees the subtotal table and it has following sub-total results:
      | Sub-Total:          | <Sub-Total>     |
      | Flat Shipping Rate: | <Shipping Rate> |
      | Total:              | <Total>         |
    Then user clicks the Confirm Order button at the bottom of the Confirm Order form
    And user is redirected to "Your order has been placed!" page
    Then user clicks the Continue button at the bottom of the page
    And user is redirected to "Your Store" page
    Then user clicks Account icon at NAVIGATION BAR
    And user clicks "Order History" at Account dropdown menu
    Then user is redirected to "Order History" page
    Then user sees a new order added with credentials:
      | Customer        | <Billing Name> <Billing Surname> |
      | No. of Products | <Quantity>                       |
      | Status          | <Order Status>                   |
      | Total           | <Total>                          |
      | Date Added      | <Date>                           |
    Then user clicks on the View button for the new order
    # And user is redirected to "Order Information" page
    Then user sees "Payment Method" in order details: "<Payment Method>"
    Then user sees "Shipping Method" in order details: "<Shipping Method>"
    Then user in "Payment Address" table following credentials:
      | <Billing Name> <Billing Surname>   |
      | <Billing Company>                  |
      | <Billing Address1>                 |
      | <Billing Address2>                 |
      | <Billing City> <Billing Post Code> |
      | <Billing Region>                   |
      | <Billing Country>                  |
    Then user in "Shipping Address" table following credentials:
      | <Delivery Name> <Delivery Surname>   |
      | <Delivery Company>                   |
      | <Delivery Address1>                  |
      | <Delivery Address2>                  |
      | <Delivery City> <Delivery Post Code> |
      | <Delivery Region>                    |
      | <Delivery Country>                   |
    Then user sees products table:
      | Product Name | <Product Name> |
      | Quantity     | <Quantity>     |
      | Unit Price   | <Sub-Total>    |
      | Total        | <Sub-Total>    |
    Then user sees sub-total table:
      | Sub-Total:          | <Sub-Total>     |
      | Flat Shipping Rate: | <Shipping Rate> |
      | Total:              | <Total>         |
    Then user sees Order Comments "<Delivery Comment>"

    Examples: 
      | Product Name             | Unit Price | Quantity | Sub-Total | Sum       | Eco Tax | VAT     | Total     | Shipping Rate | Shipping Method    | Payment Method   | Order Status | Billing Name | Billing Surname | Billing Company       | Billing Address1      | Billing Address2     | Billing City | Billing Post Code | Billing Country | Billing Region | Billing Comment        | Delivery Name | Delivery Surname | Delivery Company                | Delivery Address1     | Delivery Address2    | Delivery City | Delivery Post Code | Delivery Country | Delivery Region | Delivery Comment                 | Date       |
      | HTC Touch HD             | $100.00    |        1 | $100.00   | $122.00   | $2.00   | $20.00  | $105.00   | $5.00         | Flat Shipping Rate | Cash On Delivery | Pending      | John         | Doe             | Optional Company name | Mandatory address 123 | Optional address 321 | Riga         | LV-1000           | Latvia          | Rīga           | Optional comment text. | Jane          | Doe              | Different Optional Company name | Mandatory address 789 | Optional address 987 | Ventspils     | LV-3601            | Latvia           | Ventspils       | Different optional comment text. | 03/04/2024 |
      | Palm Treo Pro            | $337.99    |        1 | $279.99   | $337.99   | $2.00   | $56.00  | $284.99   | $5.00         | Flat Shipping Rate | Cash On Delivery | Pending      | John         | Doe             | Optional Company name | Mandatory address 123 | Optional address 321 | Riga         | LV-1000           | Latvia          | Rīga           | Optional comment text. | Jane          | Doe              | Different Optional Company name | Mandatory address 789 | Optional address 987 | Ventspils     | LV-3601            | Latvia           | Ventspils       | Different optional comment text. | 03/04/2024 |
      | Samsung SyncMaster 941BW | $200.00    |        1 | $200.00   | $242.00   | $2.00   | $40.00  | $205.00   | $5.00         | Flat Shipping Rate | Cash On Delivery | Pending      | John         | Doe             | Optional Company name | Mandatory address 123 | Optional address 321 | Riga         | LV-1000           | Latvia          | Rīga           | Optional comment text. | Jane          | Doe              | Different Optional Company name | Mandatory address 789 | Optional address 987 | Ventspils     | LV-3601            | Latvia           | Ventspils       | Different optional comment text. | 03/04/2024 |
      | Sony VAIO                | $1,000.00  |        1 | $1,000.00 | $1,202.00 | $2.00   | $200.00 | $1,005.00 | $5.00         | Flat Shipping Rate | Cash On Delivery | Pending      | John         | Doe             | Optional Company name | Mandatory address 123 | Optional address 321 | Riga         | LV-1000           | Latvia          | Rīga           | Optional comment text. | Jane          | Doe              | Different Optional Company name | Mandatory address 789 | Optional address 987 | Ventspils     | LV-3601            | Latvia           | Ventspils       | Different optional comment text. | 03/04/2024 |
      | iPod Classic             | $100.00    |        1 | $100.00   | $122.00   | $2.00   | $20.00  | $105.00   | $5.00         | Flat Shipping Rate | Cash On Delivery | Pending      | John         | Doe             | Optional Company name | Mandatory address 123 | Optional address 321 | Riga         | LV-1000           | Latvia          | Rīga           | Optional comment text. | Jane          | Doe              | Different Optional Company name | Mandatory address 789 | Optional address 987 | Ventspils     | LV-3601            | Latvia           | Ventspils       | Different optional comment text. | 03/04/2024 |
