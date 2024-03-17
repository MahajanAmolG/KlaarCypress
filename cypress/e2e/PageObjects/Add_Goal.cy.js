// Cypress.on('uncaught:exception', (err, runnable) => {
//     // Log the error, but don't fail the test
//     console.log('Unhandled promise rejection:', err);
//     return false;
//   });
  
  ///<reference types= 'cypress'/>
  // cypress/support/step_definitions/login.js
  import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
  import 'cypress-iframe'
  Given('I am on the login page', () => {
    cy.viewport(1280,720)
    cy.visit('https://klaaradmin-trials711.orangehrmlive.com/auth/login');
  });
  
  When('I enter valid credentials', () => {
    cy.get('input[name="txtUsername"]').type('Admin');
    cy.get('input[name="txtPassword"]').type('SyN6Ktl@O0');
    cy.get('button[type="submit"]').click();  
  });

  Then('Navigate to the Performance Module', () => {
    cy.get('#left_menu_item_18 > .main-menu-item-1').click()
  });

  And('Select "Goals" -> "My Goals.', () => {
    cy.wait(5000)
    cy.get('.top-ribbon-menu-more-items > top-level-menu-item > .top-level-menu-item-container > .top-level-menu-item').click({force:true});
    cy.wait(4000)
    cy.get('[data-automation-id="more_menu_child_menu_performance_Goals"]').trigger('mouseover');
    cy.wait(4000)
    cy.get('[data-automation-id="more_menu_child_menu_performance_myGoals"]').click();
  })

  When('Click on the "Create Goal" button', () => {
    cy.wait(4000)
    cy.get('.list-inner-left-panel > .btn').click({force:true})
  })

  And('Fill in all required fields to create a goal', () => {
    cy.get('#name_value').type('Test')
    cy.wait(5000)
    cy.get('[aria-label="Toggle Toolbar"]').click();
    cy.get('#mceu_13 > button > .mce-ico').click()
    cy.get('#mceu_42-inp').type('https://as2.ftcdn.net/v2/jpg/05/47/97/81/1000_F_547978128_vqEEUYBr1vcAwfRAqReZXTYtyawpgLcC.jpg')
    cy.get('#mceu_56 > button').click()
    cy.get('#dueDate').type('2024-03-29')
    cy.wait(5000)
    cy.get(':nth-child(2) > .form-row > .form-group > .input-group > .dropdown > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner').click()
    cy.get('#bs-select-3-2').click()
    cy.get('#spinnerInputweight').type('10')
    cy.get('.form-row > :nth-child(2) > .btn').click()
    cy.wait(5000)
    if(cy.get('.goal-priority-container > .goal-summary-value').should('have.text','High')) {
    cy.log("Priority is High")
    
    }
    else{
      cy.log("Priority is not Matching")
    }

    if(cy.get('.due-date-container > .goal-summary-value').should('have.text','2024-03-29')){
      cy.log("Date is Matching")
    }
    else{
      cy.log("Date is not Matching")
    }
    cy.log("Done")
    
  });
    