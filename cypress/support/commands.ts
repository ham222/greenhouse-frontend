/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare namespace Cypress {
  interface Chainable {
    getBySel(selector: string, ...args: any[]): Chainable<any>;
    containsSel(selector: string, ...args: any[]): Chainable<any>;
    login(): Chainable<any>;
  }
}

Cypress.Commands.add("getBySel", (selector: string, ...args: any[]) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add("containsSel", (selector: string, ...args: any[]) => {
  return cy.contains(`[data-testid=${selector}]`, ...args);
});

//This will only work for mock login, as mocks server does not check for the validity of the authorization header
Cypress.Commands.add("login", () => {
  window.localStorage.setItem("token", "example_token");
});
