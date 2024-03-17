Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error, but don't fail the test
  console.log('Unhandled promise rejection:', err);
  return false;
});

///<reference types= 'cypress'/>
// cypress/support/step_definitions/login.js
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
Given('I am on the login page', () => {
  cy.viewport(1280,720)
  cy.visit('https://klaaradmin-trials711.orangehrmlive.com/auth/login');
});

When('I enter valid credentials', () => {
  cy.get('input[name="txtUsername"]').type('Admin');
  cy.get('input[name="txtPassword"]').type('SyN6Ktl@O0');
  cy.get('button[type="submit"]').click();  
});


Then('Navigate to the Employee Management Module', () => {
 
  cy.get('#top_level_menu_item_menu_item_128 > .top-level-menu-item').click(); 
});

When('Click on the "Add Employee" button to open the "Add Employee" modal.',() =>{
  cy.wait(8000)
  cy.get('#addEmployeeButton > .material-icons').click()
})

When('Fill in the required username fields',() =>{
  const faker = require('faker');
  const firstName = faker.name.firstName();
  const middleName = faker.name.firstName();
  const lastName = faker.name.lastName();

cy.get('#first-name-box').click().type(firstName);
cy.get('#middle-name-box').click().type(middleName);
cy.get('#last-name-box').click().type(lastName);
})

And('I disable Auto Generate Employee ID',() =>{
  cy.get('#autoGenerateEmployeeId').then(($checkbox) => {
    if ($checkbox.is(':checked')) {
      $checkbox.trigger('click')
    }
  })
})
Then('I should see the "Employee Id" field to Add an employee ID',() =>{
 cy.get('#employeeId').wait(10000).click();
 function generateEmployeeId() {
  return Math.floor(1000 + Math.random() * 9000);
}
cy.get('#employeeId').type(generateEmployeeId().toString());
})

And('I change the joined date to 5 days ahead of today', () => {
  cy.wait(10000)
  cy.get('#joinedDate').clear();
  cy.get('#joinedDate').should('be.visible').and('not.be.disabled');

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 5);
const newDate = currentDate.toISOString().split('T')[0];
cy.get('#joinedDate').type(newDate);
});

And('I select the location as "India Office" and Enable "Create Login Details', () => {
cy.get('button[data-id="location"]').click({force:true});
cy.contains('.dropdown-menu .dropdown-item', 'India Office').click();
cy.get('#hasLoginDetails').click({force:true});
cy.wait(5000)
const random = '1' + Math.random().toString().substr(2, 9);
cy.get('#username').wait(10000).click().type(`${Date.now()}@cy-test.com`);
cy.get('#password').wait(10000).click().type(random);
cy.get('#confirmPassword').wait(10000).click().type(random);
cy.get('button[data-id="adminRoleId"]').click();
cy.contains('.dropdown-menu .dropdown-item', 'Regional HR Admin').click();
});

Then("Disable All Regions", () => {
  cy.get('#allRegions').click({force:true});
  cy.wait(5000)
  cy.get('input.multiselect-autocomplete').click();
  cy.get('#dropdown-multyselect li[id="IN"]').click();
  cy.wait(3000)
  cy.get('#selectedLocationsOnly_IN').click({force:true});
  cy.wait(3000)
  cy.get(':nth-child(2) > .ng-valid-schema-form > .multyselect-autocomplete-holder > :nth-child(1) > .multi-select-container > .input-group > .multiselect-autocomplete').click({force:true})
  cy.get('#dropdown-multyselect li').contains('India Office').click();
});

And('I click on the "Next" button', () => {
  cy.get('#modal-save-button').click()
})

And('I verify that I am on the personal details page', () => {
  cy.wait(5000)
  cy.url().should('include', '/pim/wizard/personal_details');
})

And('I skip adding personal details and click on the "Next" button', () => {
  cy.wait(4000)
  cy.get('[ng-show="!vm.showFinishButton"]').click();
})

And('I verify that I have landed on the Employee Details page', () => {
  cy.wait(5000)
  cy.url().should('include', '/pim/wizard/job');
})

When('I select "Full-Time Permanent" as the employment status', () => {
  cy.wait(5000)
  cy.get(':nth-child(4) > .input-group > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click({force:true})
  cy.get('#bs-select-23-4').click({force:true})
})

When('I add comments', () => {

  cy.get('#comment').click()
  const randomText = Cypress._.times(5, () => Cypress._.random(0, 1) ? Cypress._.random(10000, 99999).toString(36) : Cypress._.sample(['lorem', 'ipsum', 'dolor', 'sit', 'amet'])).join(' ');
  cy.get('#comment').type(randomText);
  });

  Then('Click on the "Next" Button and verify that you have landed on the Contact Details page.', () => {
    cy.get('[ng-show="!vm.showFinishButton"]').click()
    cy.wait(5000)
    cy.url().should('include', '/pim/wizard/contact_details');
  })

  When('Skip adding contact details, click on the "Next" button, and verify that you have landed on the Onboarding page.', () => {
    cy.get('[ng-show="!vm.showFinishButton"]').click()
    cy.wait(5000)
    cy.url().should('include', '/pim/wizard/onboarding');
  })

  Then('In the dropdown select "Onboarding - India" and Save. Verify the pop-up message upon saving.', () => {

    cy.get('.select-wrapper.initialized').click();
    cy.contains('.dropdown-content.select-dropdown li', 'Onboarding - India').click();
    cy.wait(3000)
    cy.get('[ng-show="vm.showFinishButton"]').click()
    cy.wait(2000)
    cy.get('#toast-container').should('contain', 'Successfully Saved');
  })

  And('verify that you have landed on the employee details page', () => {
    cy.wait(5000)
    cy.url().should('include', '/pim/employees/109/profile');
    cy.get('a[data-automation-id="menu_employee_profile_Job"]').click();
    cy.wait(10000)
    cy.get('#employment_status_id').should('have.attr', 'aria-disabled', 'true').and('contain.text', 'Full-Time Permanent');

  })

  // Given('I am on the dashboard page', () => {
  //   cy.viewport(1280,720)
  //   cy.url().should('include', '/dashboard');
  // });