/// <reference types="Cypress" />

describe("tasks page", () => {
  it("should render the main image", () => {
    // "visit" is not just a command that gets us to a page,
    // it also ensures that this page renders correctly and the test fails if it does not.
    cy.visit("http://localhost:5173/");

    // use the "get" command to get something from the page
    // cy.get('.main-header img')
    cy.get(".main-header").find("img");
  });

  // a link to all expectations
  // https://docs.cypress.io/app/references/assertions

  it("should display the page title", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("have.length", 1);
    cy.get("h1").contains("My Cypress Course Tasks");
  });
});
