Feature: Login to Klaar Admin

Scenario: Naviagtion to Employee Management Module
  Given I am on the login page
  When I enter valid credentials
  Then Navigate to the Employee Management Module
  When Click on the "Add Employee" button to open the "Add Employee" modal.
  When Fill in the required username fields
  And I disable Auto Generate Employee ID
  Then I should see the "Employee Id" field to Add an employee ID
  And I change the joined date to 5 days ahead of today
  And I select the location as "India Office" and Enable "Create Login Details
  Then Disable All Regions
  And I click on the "Next" button
  And I verify that I am on the personal details page
  And I skip adding personal details and click on the "Next" button
  And I verify that I have landed on the Employee Details page
  When I select "Full-Time Permanent" as the employment status
  When I add comments
  Then Click on the "Next" Button and verify that you have landed on the Contact Details page.
  And Skip adding contact details, click on the "Next" button, and verify that you have landed on the Onboarding page.
  Then In the dropdown select "Onboarding - India" and Save. Verify the pop-up message upon saving.
  And verify that you have landed on the employee details page