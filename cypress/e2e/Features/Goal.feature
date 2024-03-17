Feature: Create a Goal

Scenario: Navigate to the Performance module.
  Given I am on the login page
  When I enter valid credentials
  Then Navigate to the Performance Module
  And Select "Goals" -> "My Goals.
  When Click on the "Create Goal" button
  And Fill in all required fields to create a goal
