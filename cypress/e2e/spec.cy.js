require('dotenv').config();

describe('Test Okta Authentication', () => {

  it('Page renders correctly', () => {
    cy.visit('localhost:3000');
    cy.get('h1').should('contain', 'Hello, world!');
  })
  // Get the login form and fill it out
  it('Login with email works', () => {
    cy.visit('localhost:3000');
    // Console log the current URL
    cy.get('button').contains('Login').click();
    // Assert that the URL contains part of the Okta login URL
    cy.url().should('include', 'https://dev-');
    // Find with id input#input28 and type in the username
    // NOTE: To use the Cypress env variables, make sure to add them in cypress.config.js
    cy.get('input#input28').type(`${Cypress.env('OktaUserName')}`);// or hardcode the username
    // Find with id input#input36 and type in the password
    cy.get('input#input36').type(`${Cypress.env('OktaUserPassword')}`); // or hardcode the password
    // Find with id button#submit and click it
    cy.get('input.button.button-primary').click();
  })

  // Test that the user is logged in
  it('User is logged in', () => {
    cy.visit('localhost:3000');
    // Console log the current URL
    cy.get('button').contains('Login').click();
    // Assert that the URL contains part of the Okta login URL
    cy.url().should('include', 'https://dev-');
    // Find with id input#input28 and type in the username
    // NOTE: To use the Cypress env variables, make sure to add them in cypress.config.js
    cy.get('input#input28').type(`${Cypress.env('OktaUserName')}`);// or hardcode the username
    // Find with id input#input36 and type in the password
    cy.get('input#input36').type(`${Cypress.env('OktaUserPassword')}`); // or hardcode the password
    // Find with id button#submit and click it
    cy.get('input.button.button-primary').click();
    cy.get('p').should('contain', "Welcome! We're glad you're here ...");
  })

  // Get the logout button and click it
  it('Logout works', () => {
    cy.visit('localhost:3000');
    // // Console log the current URL
    cy.get('button').contains('Login').click();
    // Assert that the URL contains part of the Okta login URL
    // NOTE: To use the Cypress env variables, make sure to add them in cypress.config.js
    cy.get('input#input28').type(`${Cypress.env('OktaUserName')}`);// or hardcode the username
    // Find with id input#input36 and type in the password
    cy.get('input#input36').type(`${Cypress.env('OktaUserPassword')}`); // or hardcode the password
    // Find with id button#submit and click it
    cy.get('input.button.button-primary').click();

    cy.get('p').should('contain', "Welcome! We're glad you're here ...");
    cy.get('[data-testid="logout-button"]').should('exist');
    cy.get('[data-testid="logout-button"]').click();
  })
})

